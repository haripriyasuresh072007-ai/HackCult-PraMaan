import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import crypto from "crypto";

/* =========================================================
   CREATE CERTIFICATE
========================================================= */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      applicationId,
    } = body;

    if (!applicationId) {
      return NextResponse.json(
        {
          success: false,
          message: "Application ID is required.",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       FIND APPLICATION
    ===================================================== */

    const application =
      await prisma.application.findUnique({
        where: {
          id: applicationId,
        },
        include: {
          certificate: true,
          instrumentRef: true,
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

    /* =====================================================
       PREVENT DUPLICATE CERTIFICATE
    ===================================================== */

    if (application.certificate) {
      return NextResponse.json({
        success: true,
        message: "Certificate already exists.",
        certificate: application.certificate,
      });
    }

    /* =====================================================
       GENERATE DATES
    ===================================================== */

    const today = new Date();

    const validUntil = new Date(today);

    validUntil.setFullYear(
      validUntil.getFullYear() + 1
    );

    const formatDate = (date: Date) =>
      date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

    const issuedDate = formatDate(today);
    const validDate = formatDate(validUntil);

    /* =====================================================
       CERTIFICATE ID
    ===================================================== */

    const certificateId =
      `CERT-${crypto.randomUUID()}`;

    /* =====================================================
       CREATE CERTIFICATE
    ===================================================== */

    const certificate =
      await prisma.certificate.create({
        data: {
          id: certificateId,

          applicationId:
            application.id,

          business:
            application.business,

          instrument:
            application.instrument,

          issuedDate,

          validUntil:
            validDate,

          status: "Valid",

          qrCode:
            `LM-${crypto.randomUUID()}`,
        },
      });

    /* =====================================================
       UPDATE APPLICATION
    ===================================================== */

    await prisma.application.update({
      where: {
        id: application.id,
      },
      data: {
        status: "Verified",
      },
    });

    /* =====================================================
       UPDATE INSTRUMENT
    ===================================================== */

    if (application.instrumentId) {
      const nextVerification =
        new Date();

      nextVerification.setFullYear(
        nextVerification.getFullYear() + 1
      );

      await prisma.instrument.update({
        where: {
          id: application.instrumentId,
        },
        data: {
          status: "Verified",
          lastVerified: issuedDate,
          nextVerification:
            formatDate(nextVerification),
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Certificate generated successfully.",
        certificate,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "CREATE CERTIFICATE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to generate certificate.",
      },
      { status: 500 }
    );
  }
}