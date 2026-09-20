import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import crypto from "crypto";

/* =========================================================
   GET APPLICATIONS
========================================================= */

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      orderBy: {
        submitted: "desc",
      },
      include: {
        instrumentRef: true,
        certificate: true,
      },
    });

    return NextResponse.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("GET APPLICATIONS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch applications.",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   CREATE APPLICATION
========================================================= */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      business,
      instrument,
      instrumentId,
      type,
      location,
      submitted,
      priority,
    } = body;

    if (
      !business ||
      !instrument ||
      !instrumentId ||
      !type ||
      !location ||
      !submitted ||
      !priority
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide all required application details.",
        },
        { status: 400 }
      );
    }

    const existingInstrument =
      await prisma.instrument.findUnique({
        where: {
          id: instrumentId,
        },
      });

    if (!existingInstrument) {
      return NextResponse.json(
        {
          success: false,
          message: "Selected instrument was not found.",
        },
        { status: 404 }
      );
    }

    const application =
      await prisma.application.create({
        data: {
          id: `APP-${crypto.randomUUID()}`,

          business: String(business).trim(),

          instrument: String(instrument).trim(),

          instrumentId,

          type: String(type).trim(),

          location: String(location).trim(),

          submitted: String(submitted).trim(),

          priority: String(priority).trim(),

          status: "Pending",
        },

        include: {
          instrumentRef: true,
          certificate: true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Application submitted successfully.",
        application,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "CREATE APPLICATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit application.",
      },
      { status: 500 }
    );
  }
}