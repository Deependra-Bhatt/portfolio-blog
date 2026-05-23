import { ObjectId } from "mongodb";

export interface Blog {
  _id?: ObjectId;

  title: string;

  slug: string;

  excerpt: string;

  content: string;

  tags: string[];

  createdAt: Date;

  updatedAt: Date;
}
