// types/blog.ts
import { ObjectId } from "mongodb";

export type BlogStatus = "draft" | "published" | "archived";

export interface Blog {
  _id?: ObjectId;

  title: string;

  slug: string;

  excerpt: string;

  content: string;

  tags: string[];

  createdAt: Date;

  updatedAt: Date;

  // Dashboard Lifecycle Additions
  status?: BlogStatus;

  deletedAt?: Date | null;
}
