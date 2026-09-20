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
          message: "Please provide all required application details.",
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
          business: business.trim(),
          instrument: instrument.trim(),
          instrumentId,
          type: type.trim(),
          location: location.trim(),
          submitted: submitted.trim(),
          priority: priority.trim(),
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
        message: "Application submitted successfully.",
        application,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE APPLICATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit application.",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   UPDATE APPLICATION STATUS
========================================================= */

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const {
      applicationId,
      status,
    } = body;

    if (!applicationId || !status) {
      return NextResponse.json(
        {
          success: false,
          message: "Application ID and status are required.",
        },
        { status: 400 }
      );
    }

    const application =
      await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
      });

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message: "Application not found.",
        },
        { status: 404 }
      );
    }

    const updatedApplication =
      await prisma.application.update({
        where: {
          id: applicationId,
        },
        data: {
          status,
        },
        include: {
          instrumentRef: true,
          certificate: true,
        },
      });

    return NextResponse.json({
      success: true,
      message: "Application status updated.",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("UPDATE APPLICATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update application.",
      },
      { status: 500 }
    );
  }
}