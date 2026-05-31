// app/api/setup-indexes/route.ts
import { NextResponse } from "next/server";
import { getBlogsCollection } from "@/lib/blog";

export async function GET() {
  try {
    const blogsCollection = await getBlogsCollection();

    await blogsCollection.createIndex({ slug: 1 }, { unique: true });

    // COMPOUND INDEX: Optimized for Dashboard management and fast lifecycle sorting
    await blogsCollection.createIndex({
      deletedAt: 1,
      status: 1,
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      message: "Compound lifecycle indexes added.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Index routine failed." },
      { status: 500 },
    );
  }
}
