import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import crypto from "crypto";

function hashPassword(password: string) {
  return crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    const password = String(body.password ?? "");

    const role = String(body.role ?? "")
      .trim()
      .toLowerCase();

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!email || !password || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "Email, password and role are required.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // FIND USER
    // ==========================================

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User account not found.",
        },
        { status: 401 }
      );
    }

    // ==========================================
    // CHECK ROLE FIRST
    // ==========================================

    if (user.role.toLowerCase() !== role) {
      return NextResponse.json(
        {
          success: false,
          message: "Selected role does not match this account.",
        },
        { status: 403 }
      );
    }

    // ==========================================
    // CHECK PASSWORD
    // ==========================================

    const hashedPassword = hashPassword(password);

    /*
     * Supports:
     *
     * 1. Normal registered users
     *    -> password stored as SHA-256 hash
     *
     * 2. Hackathon demo accounts
     *    -> password may be stored directly in Prisma Studio
     *
     * This fallback is ONLY for the prototype/demo.
     */

    const passwordMatches =
      user.password === hashedPassword ||
      user.password === password;

    if (!passwordMatches) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect password.",
        },
        { status: 401 }
      );
    }

    // ==========================================
    // LOGIN SUCCESS
    // ==========================================

    return NextResponse.json({
      success: true,
      message: "Login successful.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        businessId: user.businessId,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while logging in.",
      },
      { status: 500 }
    );
  }
}