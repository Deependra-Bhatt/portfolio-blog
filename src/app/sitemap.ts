import { MetadataRoute } from "next";

import { getAllBlogs } from "@/lib/blogQueries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getAllBlogs();

  const blogRoutes = blogs.map((blog) => ({
    url: `https://yourdomain.com/blogs/${blog.slug}`,

    lastModified: blog.updatedAt,
  }));

  return [
    {
      url: "https://yourdomain.com",
      lastModified: new Date(),
    },

    {
      url: "https://yourdomain.com/blogs",
      lastModified: new Date(),
    },

    ...blogRoutes,
  ];
}
