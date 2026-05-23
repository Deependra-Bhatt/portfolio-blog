import { NextResponse } from "next/server";

import { getBlogsCollection } from "@/lib/blog";

interface Params {
  params: {
    slug: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const blogsCollection = await getBlogsCollection();
    const awaitedParams = await params;

    const blog = await blogsCollection.findOne({
      slug: awaitedParams.slug,
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
