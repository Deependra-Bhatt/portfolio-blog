// src/lib/blogQueries.ts
import { getBlogsCollection } from "./blog";
import { Blog, BlogStatus } from "@/types/blog";
import { ObjectId, Filter } from "mongodb";

/**
 * Public: Get all active, published blogs
 */
export async function getAllBlogs(): Promise<Blog[]> {
  const blogsCollection = await getBlogsCollection();

  // 1. Explicitly type the query filter to match our Blog collection type schema
  const filter: Filter<Blog> = {
    deletedAt: { $exists: false },
    // Explicit array type casting tells TypeScript these are precise BlogStatus tokens
    status: { $in: ["published", undefined] as (BlogStatus | undefined)[] },
  };

  const blogs = await blogsCollection
    .find(filter)
    .sort({ createdAt: -1 })
    .toArray();

  return blogs;
}

export async function getBlogBySlug(slug: string) {
  const blogsCollection = await getBlogsCollection();

  const blog = await blogsCollection.findOne({
    slug,
    deletedAt: { $exists: false },
  });

  if (blog && blog.status && blog.status === "draft") {
    return null;
  }

  return blog;
}

/**
 * Public: Fetch contextually related logs based on string tags
 */
export async function getRelatedBlogs(
  currentSlug: string,
  tags: string[],
): Promise<Blog[]> {
  const blogsCollection = await getBlogsCollection();

  const filter: Filter<Blog> = {
    slug: { $ne: currentSlug },
    tags: { $in: tags },
    deletedAt: { $exists: false },
    status: { $in: ["published", undefined] as (BlogStatus | undefined)[] },
  };

  return await blogsCollection.find(filter).limit(3).toArray();
}

/**
 * Admin: Get all items including drafts/archives, excluding hard/soft deleted ones
 */
export async function getAdminBlogs() {
  const blogsCollection = await getBlogsCollection();
  return await blogsCollection
    .find({ deletedAt: { $exists: false } })
    .sort({ createdAt: -1 })
    .toArray();
}

/**
 * Admin: Safely transition status (draft <-> published <-> archived)
 */
export async function updateBlogStatus(id: string, status: BlogStatus) {
  const blogsCollection = await getBlogsCollection();
  const result = await blogsCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status,
        updatedAt: new Date(),
      },
    },
  );
  return result.modifiedCount > 0;
}

/**
 * Admin: Execute a soft-delete to preserve data integrity for analytics
 */
export async function softDeleteBlog(id: string) {
  const blogsCollection = await getBlogsCollection();
  const result = await blogsCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
    },
  );
  return result.modifiedCount > 0;
}

/**
 * Public: Get paginated active, published blogs along with system total count
 */
export async function getPaginatedBlogs(
  page: number,
  limit: number,
): Promise<{ blogs: Blog[]; total: number }> {
  const blogsCollection = await getBlogsCollection();

  const skip = (page - 1) * limit;

  // 2. Applied Filter<Blog> constraint directly here to fix your ts(2769) overload bug
  const filter: Filter<Blog> = {
    deletedAt: { $exists: false },
    status: { $in: ["published", undefined] as (BlogStatus | undefined)[] },
  };

  const [blogs, total] = await Promise.all([
    blogsCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray(),
    blogsCollection.countDocuments(filter),
  ]);

  return { blogs, total };
}
