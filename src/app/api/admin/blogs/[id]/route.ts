// app/api/admin/blogs/[id]/route.ts
import { NextResponse } from "next/server";
import { updateBlogStatus, softDeleteBlog } from "@/lib/blogQueries";

// NOTE: In Next.js 15+, dynamic route params must be awaited
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { action, status } = await request.json();

    if (action === "DELETE") {
      const success = await softDeleteBlog(id);
      if (!success)
        return NextResponse.json(
          { success: false, message: "Document not found" },
          { status: 404 },
        );
      return NextResponse.json({
        success: true,
        message: "System state: Soft delete verified.",
      });
    }

    if (action === "STATUS") {
      if (!status)
        return NextResponse.json(
          { success: false, message: "Missing status payload" },
          { status: 400 },
        );
      const success = await updateBlogStatus(id, status);
      if (!success)
        return NextResponse.json(
          { success: false, message: "Status update refused" },
          { status: 404 },
        );
      return NextResponse.json({
        success: true,
        message: `Status updated to ${status}`,
      });
    }

    return NextResponse.json(
      { success: false, message: "Malformed action header" },
      { status: 400 },
    );
  } catch (error) {
    console.error("CMS API Exception:", error);
    return NextResponse.json(
      { success: false, message: "Internal server compilation error" },
      { status: 500 },
    );
  }
}
