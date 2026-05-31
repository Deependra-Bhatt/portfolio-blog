// app/api/blogs/[slug]/route.ts

import { NextResponse } from "next/server";
import { getBlogsCollection } from "@/lib/blog";

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(req: Request, { params }: Params) {
  try {
    const blogsCollection = await getBlogsCollection();
    const { slug } = await params;

    const blog = await blogsCollection.findOne({
      slug: slug,
    });

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const { title, excerpt, content, tags, status } = await request.json();

    const blogsCollection = await getBlogsCollection();

    const result = await blogsCollection.updateOne(
      { slug },
      {
        $set: {
          title,
          excerpt,
          content,
          tags: Array.isArray(tags)
            ? tags
            : tags.split(",").map((t: string) => t.trim()),
          status: status || "draft",
          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Target script not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "System core compiled changes successfully.",
    });
  } catch (error) {
    console.error("PUT Update Exception:", error);
    return NextResponse.json(
      { success: false, message: "Compilation failure." },
      { status: 500 },
    );
  }
}
