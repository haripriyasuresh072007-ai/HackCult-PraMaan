"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";

import {
  Certificate,
  getCertificates,
} from "@/app/lib/businessStore";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selected, setSelected] = useState<Certificate | null>(null);

  useEffect(() => {
    setCertificates(getCertificates());
  }, []);

  return (
    <main className="min-h-screen bg-[#030712] text-white">

      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="fixed inset-0 -z-0 overflow-hidden">

        <div className="absolute left-[-200px] top-[100px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute right-[-150px] top-[300px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />

      </div>


      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <nav className="relative z-10 flex items-center justify-between border-b border-white/10 bg-[#030712]/80 px-6 py-4 backdrop-blur-xl lg:px-10">

        <Link
          href="/business"
          className="flex items-center gap-3"
        >

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-xl">
            ⚖
          </div>

          <div>

            <div className="text-sm font-bold tracking-[0.25em]">
              LEGAL METROLOGY
            </div>

            <div className="text-xs text-slate-500">
              Business Portal
            </div>

          </div>

        </Link>


        <Link
          href="/business"
          className="rounded-xl border border-white/10 px-4 py-2 text-xs text-slate-400 transition hover:text-white"
        >
          ← Dashboard
        </Link>

      </nav>


      {/* =========================================================
          CONTENT
      ========================================================= */}

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:px-10">

        <div className="mb-8">

          <div className="text-xs font-semibold tracking-[0.2em] text-blue-400">
            DIGITAL DOCUMENTS
          </div>

          <h1 className="mt-2 text-4xl font-bold">
            Verification Certificates
          </h1>

          <p className="mt-3 text-slate-500">
            Access digitally generated certificates for your verified
            weighing and measuring instruments.
          </p>

        </div>


        {/* =========================================================
            CERTIFICATE LIST
        ========================================================= */}

        <div className="grid gap-5">

          {certificates.length === 0 ? (

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-16 text-center">

              <div className="text-4xl">
                ◈
              </div>

              <h2 className="mt-4 text-xl font-semibold">
                No certificates available
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Certificates will appear here after an officer completes
                verification of your instrument.
              </p>

            </div>

          ) : (

            certificates.map((certificate) => (

              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                onView={() => setSelected(certificate)}
              />

            ))

          )}

        </div>

      </section>


      {/* =========================================================
          CERTIFICATE MODAL
      ========================================================= */}

      {selected && (

        <CertificateModal
          certificate={selected}
          onClose={() => setSelected(null)}
        />

      )}

    </main>
  );
}


/* =========================================================
   CERTIFICATE CARD
========================================================= */

function CertificateCard({
  certificate,
  onView,
}: {
  certificate: Certificate;
  onView: () => void;
}) {

  return (

    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition hover:border-blue-400/20">

      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

        <div className="flex gap-5">

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.06] text-2xl">
            ✓
          </div>


          <div>

            <div className="flex flex-wrap items-center gap-3">

              <h2 className="text-lg font-semibold">
                {certificate.instrumentName}
              </h2>

              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold text-emerald-300">
                {certificate.status.toUpperCase()}
              </span>

            </div>


            <div className="mt-2 text-sm text-slate-500">
              Certificate No. {certificate.certificateNumber}
            </div>


            <div className="mt-3 flex flex-wrap gap-5 text-xs text-slate-600">

              <span>
                Issued {certificate.issuedDate}
              </span>

              <span>
                Valid until {certificate.validUntil}
              </span>

              <span>
                Instrument ID {certificate.instrumentId ?? "Not available"}
              </span>

            </div>

          </div>

        </div>


        <button
          onClick={onView}
          className="rounded-xl bg-blue-600 px-6 py-3 text-xs font-semibold transition hover:bg-blue-500"
        >
          View Certificate →
        </button>

      </div>

    </div>

  );
}


/* =========================================================
   CERTIFICATE MODAL
========================================================= */

function CertificateModal({
  certificate,
  onClose,
}: {
  certificate: Certificate;
  onClose: () => void;
}) {

  const [qrCode, setQrCode] = useState("");

  useEffect(() => {

    const verificationUrl =
  `http://192.168.1.7:3000/verify?id=${encodeURIComponent(
    certificate.id
  )}`;

    QRCode.toDataURL(
      verificationUrl,
      {
        width: 500,
        margin: 2,
        errorCorrectionLevel: "H",
      }
    )
      .then((url) => {
        setQrCode(url);
      })
      .catch((error) => {
        console.error("QR generation failed:", error);
      });

  }, [certificate]);


  const instrumentId =
    certificate.instrumentId ??
    certificate.instrument ??
    "Not available";


  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-5 backdrop-blur-md">

      <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-[#07101f] shadow-2xl">


        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex items-center justify-between border-b border-white/10 p-6">

          <div>

            <div className="text-xs font-semibold tracking-[0.2em] text-blue-400">
              DIGITAL CERTIFICATE
            </div>

            <h2 className="mt-2 text-xl font-bold">
              Verification Certificate
            </h2>

          </div>


          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-3 py-2 text-slate-400 hover:text-white"
          >
            ✕
          </button>

        </div>


        {/* =====================================================
            CERTIFICATE
        ===================================================== */}

        <div className="p-6 md:p-10">

          <div className="rounded-2xl border border-blue-400/20 bg-white/[0.025] p-6 md:p-8">


            {/* TITLE */}

            <div className="text-center">

              <div className="text-xs font-semibold tracking-[0.3em] text-blue-300">
                GOVERNMENT VERIFICATION RECORD
              </div>

              <h1 className="mt-4 text-2xl font-bold">
                LEGAL METROLOGY
              </h1>

              <p className="mt-2 text-xs text-slate-500">
                Certificate of Verification
              </p>

            </div>


            {/* STATUS */}

            <div className="mx-auto mt-7 flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-5 py-2 text-xs font-semibold text-emerald-300">

              <span>✓</span>

              {certificate.status === "Valid"
                ? "CERTIFICATE VALID"
                : "CERTIFICATE EXPIRED"}

            </div>


            {/* CERTIFICATE NUMBER */}

            <div className="mt-8 text-center">

              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
                Certificate Number
              </div>

              <div className="mt-2 font-mono text-lg font-semibold tracking-wider text-blue-200">
                {certificate.certificateNumber}
              </div>

            </div>


            {/* DETAILS */}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              <CertificateDetail
                label="Instrument"
                value={certificate.instrumentName ?? "Not available"}
              />

              <CertificateDetail
                label="Instrument ID"
                value={instrumentId}
              />

              <CertificateDetail
                label="Date of Verification"
                value={certificate.issuedDate ?? "Not available"}
              />

              <CertificateDetail
                label="Valid Until"
                value={certificate.validUntil ?? "Not available"}
              />

            </div>


            {/* =================================================
                REAL QR CODE
            ================================================= */}

            <div className="mt-8 flex flex-col items-center border-t border-white/10 pt-8">

              <div className="rounded-2xl bg-white p-4 shadow-[0_0_50px_rgba(59,130,246,0.12)]">

                {qrCode ? (

                  <img
                    src={qrCode}
                    alt="Certificate verification QR code"
                    className="h-40 w-40"
                  />

                ) : (

                  <div className="flex h-40 w-40 items-center justify-center text-center text-xs text-slate-500">
                    Generating QR...
                  </div>

                )}

              </div>


              <div className="mt-4 text-center">

                <div className="text-xs font-semibold text-slate-300">
                  Scan to verify certificate
                </div>

                <div className="mt-1 text-[10px] text-slate-600">
                  Public verification available 24/7
                </div>

              </div>


              {/* VERIFICATION URL */}

              <div className="mt-4 max-w-full rounded-xl border border-white/5 bg-black/20 px-4 py-2">

                <div className="break-all text-center font-mono text-[9px] text-slate-600">

                  {typeof window !== "undefined"
                    ? `${window.location.origin}/verify?id=${encodeURIComponent(
                        certificate.id
                      )}`
                    : ""}

                </div>

              </div>

            </div>


            {/* FOOTER */}

            <div className="mt-8 border-t border-white/10 pt-5 text-center text-[10px] leading-5 text-slate-600">

              This digital certificate is generated through the Legal
              Metrology Online Verification System. The QR code provides
              access to the public verification record.

            </div>

          </div>

        </div>


        {/* FOOTER BUTTON */}

        <div className="flex justify-end border-t border-white/10 p-5">

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-6 py-3 text-sm text-slate-400 hover:text-white"
          >
            Close
          </button>

        </div>

      </div>

    </div>

  );
}


/* =========================================================
   DETAIL COMPONENT
========================================================= */

function CertificateDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (

    <div className="rounded-xl border border-white/5 bg-white/[0.025] p-4">

      <div className="text-[10px] uppercase tracking-wider text-slate-600">
        {label}
      </div>

      <div className="mt-2 text-sm font-medium text-slate-200">
        {value}
      </div>

    </div>

  );
}