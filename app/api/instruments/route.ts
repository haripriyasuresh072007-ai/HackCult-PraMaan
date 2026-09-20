import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import crypto from "crypto";

export async function GET() {
  try {
    const instruments = await prisma.instrument.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      instruments,
    });
  } catch (error) {
    console.error("GET INSTRUMENTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch instruments.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      manufacturer,
      model,
      serialNumber,
      location,
      type,
      capacity,
    } = body;

    if (
      !name ||
      !manufacturer ||
      !model ||
      !serialNumber ||
      !location ||
      !type ||
      !capacity
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    const existingInstrument =
      await prisma.instrument.findUnique({
        where: {
          serialNumber: serialNumber.trim(),
        },
      });

    if (existingInstrument) {
      return NextResponse.json(
        {
          success: false,
          message:
            "An instrument with this serial number already exists.",
        },
        { status: 409 }
      );
    }

    const instrument = await prisma.instrument.create({
      data: {
        id: `INS-${crypto.randomUUID()}`,
        name: name.trim(),
        manufacturer: manufacturer.trim(),
        model: model.trim(),
        serialNumber: serialNumber.trim(),
        location: location.trim(),
        type: type.trim(),
        capacity: capacity.trim(),
        validUntil: "Not verified",
        status: "Pending",
        lastVerified: "Not verified",
        nextVerification: "Not scheduled",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Instrument registered successfully.",
        instrument,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE INSTRUMENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unknown database error",
      },
      { status: 500 }
    );
  }
}