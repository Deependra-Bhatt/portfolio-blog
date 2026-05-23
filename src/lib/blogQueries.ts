import { getBlogsCollection } from "./blog";
import { Blog } from "@/types/blog";

export async function getAllBlogs(): Promise<Blog[]> {
  const blogsCollection = await getBlogsCollection();

  const blogs = await blogsCollection
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return blogs;
}

export async function getBlogBySlug(slug: string) {
  const blogsCollection = await getBlogsCollection();

  const blog = await blogsCollection.findOne({
    slug,
  });

  return blog;
}

export async function getRelatedBlogs(currentSlug: string, tags: string[]) {
  const blogsCollection = await getBlogsCollection();
  const relatedBlogs = await blogsCollection
    .find({
      slug: { $ne: currentSlug },
      tags: { $in: tags },
    })
    .limit(3)
    .toArray();

  return relatedBlogs;
}
