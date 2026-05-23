import { NextResponse } from "next/server";
import { getBlogsCollection } from "@/lib/blog";

export async function GET() {
  try {
    const blogsCollection = await getBlogsCollection();

    // unique slug index
    await blogsCollection.createIndex({ slug: 1 }, { unique: true });

    // createdAt index for sorting
    await blogsCollection.createIndex({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      message: "Indexes created successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create indexes",
      },
      { status: 500 },
    );
  }
}
