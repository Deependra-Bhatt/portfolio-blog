import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { password } = body;

    if (password !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        { status: 401 },
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    // secure admin cookie
    response.cookies.set("admin-auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Login failed",
      },
      { status: 500 },
    );
  }
}
