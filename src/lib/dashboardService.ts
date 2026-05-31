// lib/dashboardService.ts
import { getBlogsCollection } from "./blog";
import { getDatabase } from "./db";

export async function getDashboardStats() {
  const blogsCollection = await getBlogsCollection();
  const db = await getDatabase();

  // Reuse your exact existing collection patterns
  const contentStats = await blogsCollection
    .aggregate([
      { $match: { deletedAt: { $exists: false } } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          published: {
            $sum: { $cond: [{ $eq: ["$status", "published"] }, 1, 0] },
          },
          drafts: { $sum: { $cond: [{ $eq: ["$status", "draft"] }, 1, 0] } },
          legacy: { $sum: { $cond: [{ $not: ["$status"] }, 1, 0] } },
        },
      },
    ])
    .toArray();

  const blogCounts = contentStats[0] || {
    total: 0,
    published: 0,
    drafts: 0,
    legacy: 0,
  };
  const combinedPublished = blogCounts.published + blogCounts.legacy;

  // Change 'analytics' to match whatever your actual analytics collection name is
  const analyticsCollection = db.collection("analytics");

  const trafficStats = await analyticsCollection
    .aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: 1 },
          uniqueVisitors: { $addToSet: "$visitorId" },
        },
      },
      {
        $project: {
          totalViews: 1,
          uniqueCount: { $size: "$uniqueVisitors" },
        },
      },
    ])
    .toArray();

  const traffic = trafficStats[0] || { totalViews: 0, uniqueCount: 0 };
  const recentBlogs = await blogsCollection
    .find({ deletedAt: { $exists: false } })
    .sort({ createdAt: -1 })
    .limit(5)
    .toArray();

  return {
    stats: {
      totalBlogs: blogCounts.total,
      publishedBlogs: combinedPublished,
      draftsCount: blogCounts.drafts,
      totalViews: traffic.totalViews,
      uniqueVisitors: traffic.uniqueCount,
    },
    recentBlogs,
  };
}
