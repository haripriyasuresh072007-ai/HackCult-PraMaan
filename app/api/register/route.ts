import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
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

    const {
      businessName,
      registrationNo,
      ownerName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      password,
    } = body;

    // ================================
    // VALIDATION
    // ================================

    if (
      !businessName ||
      !registrationNo ||
      !ownerName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !password
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must contain at least 6 characters.",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // ================================
    // CHECK EXISTING EMAIL
    // ================================

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists.",
        },
        { status: 409 }
      );
    }

    // ================================
    // CHECK BUSINESS REGISTRATION
    // ================================

    const existingBusiness = await prisma.business.findUnique({
      where: {
        registrationNo: registrationNo.trim(),
      },
    });

    if (existingBusiness) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This business registration number is already registered.",
        },
        { status: 409 }
      );
    }

    // ================================
    // CREATE BUSINESS + USER
    // ================================

    const businessId = `BUS-${crypto.randomUUID()}`;
    const userId = `USR-${crypto.randomUUID()}`;

    const hashedPassword = hashPassword(password);

    const result = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const business = await tx.business.create({
          data: {
            id: businessId,
            businessName: businessName.trim(),
            registrationNo: registrationNo.trim(),
            ownerName: ownerName.trim(),
            email: normalizedEmail,
            phone: phone.trim(),
            address: address.trim(),
            city: city.trim(),
            state: state.trim(),
            pincode: pincode.trim(),
          },
        });

        const user = await tx.user.create({
          data: {
            id: userId,
            name: ownerName.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            role: "business",
            businessId: business.id,
          },
        });

        return {
          business,
          user,
        };
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Business account created successfully.",
        business: {
          id: result.business.id,
          businessName: result.business.businessName,
          registrationNo: result.business.registrationNo,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTRATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create the account. Please try again.",
      },
      { status: 500 }
    );
  }
}