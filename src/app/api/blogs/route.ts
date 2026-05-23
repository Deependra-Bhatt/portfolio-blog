import { NextRequest, NextResponse } from "next/server";

import { getBlogsCollection } from "@/lib/blog";

import { generateSlug } from "@/utils/generateSlug";
import { validateBlog } from "@/utils/validateBlog";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // validate input
    const validationError = validateBlog(body);

    if (validationError) {
      return NextResponse.json(
        {
          success: false,
          message: validationError,
        },
        { status: 400 },
      );
    }

    const blogsCollection = await getBlogsCollection();

    const slug = generateSlug(body.title);

    // check duplicate slug
    const existingBlog = await blogsCollection.findOne({
      slug,
    });

    if (existingBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog with same title already exists",
        },
        { status: 400 },
      );
    }

    const newBlog = {
      title: body.title,
      slug,
      excerpt: body.excerpt,
      content: body.content,
      tags: body.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await blogsCollection.insertOne(newBlog);

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
      data: {
        insertedId: result.insertedId,
        slug,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create blog",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const blogsCollection = await getBlogsCollection();

    const blogs = await blogsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
      },
      { status: 500 },
    );
  }
}
