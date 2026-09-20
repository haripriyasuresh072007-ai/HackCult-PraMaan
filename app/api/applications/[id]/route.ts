import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";

/* =========================================================
   PATCH APPLICATION
   Used by Officer to Verify or Reject
========================================================= */

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const status = String(body.status ?? "").trim();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Application ID is required.",
        },
        { status: 400 }
      );
    }

    if (status !== "Verified" && status !== "Rejected") {
      return NextResponse.json(
        {
          success: false,
          message: "Status must be Verified or Rejected.",
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
          id,
        },
        include: {
          instrumentRef: true,
          certificate: true,
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
       REJECT
    ===================================================== */

    if (status === "Rejected") {
      const updatedApplication =
        await prisma.application.update({
          where: {
            id,
          },
          data: {
            status: "Rejected",
          },
          include: {
            instrumentRef: true,
            certificate: true,
          },
        });

      return NextResponse.json({
        success: true,
        message: "Application rejected successfully.",
        application: updatedApplication,
      });
    }

    /* =====================================================
       VERIFIED
       Generate certificate
    ===================================================== */

    if (application.certificate) {
      return NextResponse.json({
        success: true,
        message: "Certificate already exists.",
        application,
        certificate: application.certificate,
      });
    }

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
       TRANSACTION
    ===================================================== */

    const result = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const certificate =
          await tx.certificate.create({
            data: {
              id: `CERT-${crypto.randomUUID()}`,

              applicationId: application.id,

              business: application.business,

              instrument: application.instrument,

              issuedDate,

              validUntil: validDate,

              status: "Valid",

              qrCode: `LM-${crypto.randomUUID()}`,
            },
          });

        const updatedApplication =
          await tx.application.update({
            where: {
              id: application.id,
            },
            data: {
              status: "Verified",
            },
            include: {
              instrumentRef: true,
              certificate: true,
            },
          });

        /* ===============================================
           UPDATE INSTRUMENT
        =============================================== */

        if (application.instrumentId) {
          const nextVerification =
            new Date(today);

          nextVerification.setFullYear(
            nextVerification.getFullYear() + 1
          );

          await tx.instrument.update({
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

        return {
          certificate,
          application: updatedApplication,
        };
      }
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Application verified and certificate generated successfully.",

        application: result.application,

        certificate: result.certificate,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "PATCH APPLICATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to process application.",
      },
      { status: 500 }
    );
  }
}