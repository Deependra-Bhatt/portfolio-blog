import { Blog } from "@/types/blog";

import { getDatabase } from "./db";

export async function getBlogsCollection() {
  const db = await getDatabase();

  return db.collection<Blog>("blogs");
}
