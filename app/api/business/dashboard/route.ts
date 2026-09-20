import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get("businessId");

    if (!businessId) {
      return NextResponse.json(
        {
          success: false,
          message: "Business ID is required.",
        },
        { status: 400 }
      );
    }

    const applications = await prisma.application.findMany({
      where: {
        business: businessId,
      },
      orderBy: {
        id: "desc",
      },
    });

    const certificates = await prisma.certificate.findMany({
      where: {
        application: {
          business: businessId,
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    const instruments = await prisma.instrument.findMany({
      where: {
        applications: {
          some: {
            business: businessId,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      instruments,
      applications,
      certificates,
    });
  } catch (error) {
    console.error("BUSINESS DASHBOARD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load business dashboard.",
      },
      { status: 500 }
    );
  }
}