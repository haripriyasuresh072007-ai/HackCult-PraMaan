"use client";

import { useSearchParams } from "next/navigation";
import { getCertificates } from "@/app/lib/businessStore";
import Link from "next/link";
import { Suspense } from "react";

function VerificationContent() {
  const searchParams = useSearchParams();

  const certificateId = searchParams.get("id");

  const certificates = getCertificates();

  const certificate = certificates.find(
    (item) => item.id === certificateId
  );


  /* =========================================================
     NO CERTIFICATE ID
  ========================================================= */

  if (!certificateId) {
    return (
      <main className="min-h-screen bg-[#030712] text-white">

        <div className="fixed inset-0 -z-0 overflow-hidden">

          <div className="absolute left-[-200px] top-[100px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />

          <div className="absolute right-[-150px] top-[250px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "45px 45px",
            }}
          />

        </div>


        <section className="relative z-10 flex min-h-screen items-center justify-center px-6">

          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center backdrop-blur-xl">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-blue-400/20 bg-blue-400/10 text-3xl">
              ⚖
            </div>

            <div className="mt-6 text-xs font-semibold tracking-[0.25em] text-blue-400">
              CERTIFICATE VERIFICATION
            </div>

            <h1 className="mt-3 text-3xl font-bold">
              Verification Portal
            </h1>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Scan a Legal Metrology certificate QR code to verify
              its authenticity and validity.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">

              <div className="text-xs text-slate-600">
                No certificate reference was provided.
              </div>

            </div>

            <Link
              href="/business"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:bg-blue-500"
            >
              Return to Portal
            </Link>

          </div>

        </section>

      </main>
    );
  }


  /* =========================================================
     CERTIFICATE NOT FOUND
  ========================================================= */

  if (!certificate) {
    return (
      <main className="min-h-screen bg-[#030712] text-white">

        <div className="fixed inset-0 -z-0 overflow-hidden">

          <div className="absolute left-[-200px] top-[100px] h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[150px]" />

          <div className="absolute right-[-150px] top-[250px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "45px 45px",
            }}
          />

        </div>


        <section className="relative z-10 flex min-h-screen items-center justify-center px-6">

          <div className="w-full max-w-lg rounded-3xl border border-red-400/20 bg-white/[0.035] p-8 text-center backdrop-blur-xl">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-red-400/20 bg-red-400/10 text-3xl">
              !
            </div>

            <div className="mt-6 text-xs font-semibold tracking-[0.25em] text-red-400">
              VERIFICATION FAILED
            </div>

            <h1 className="mt-3 text-3xl font-bold">
              Certificate Not Found
            </h1>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              The certificate reference does not match a registered
              certificate in the Legal Metrology verification system.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">

              <div className="text-[10px] uppercase tracking-wider text-slate-600">
                Certificate Reference
              </div>

              <div className="mt-2 font-mono text-sm text-slate-300">
                {certificateId}
              </div>

            </div>

            <Link
              href="/business"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:bg-blue-500"
            >
              Return to Portal
            </Link>

          </div>

        </section>

      </main>
    );
  }


  /* =========================================================
     CERTIFICATE FOUND
  ========================================================= */

  const isValid = certificate.status === "Valid";


  return (
    <main className="min-h-screen bg-[#030712] text-white">

      {/* BACKGROUND */}

      <div className="fixed inset-0 -z-0 overflow-hidden">

        <div className="absolute left-[-200px] top-[100px] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[150px]" />

        <div className="absolute right-[-150px] top-[250px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />

      </div>


      {/* HEADER */}

      <header className="relative z-10 border-b border-white/10 bg-[#030712]/75 backdrop-blur-xl">

        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-xl">
              ⚖
            </div>

            <div>

              <div className="text-sm font-bold tracking-[0.2em]">
                LEGAL METROLOGY
              </div>

              <div className="text-[10px] text-slate-600">
                Public Certificate Verification
              </div>

            </div>

          </div>


          <div className="hidden text-right sm:block">

            <div className="text-[10px] uppercase tracking-wider text-slate-600">
              VERIFICATION SERVICE
            </div>

            <div className="mt-1 text-xs text-emerald-400">
              ● ONLINE
            </div>

          </div>

        </div>

      </header>


      {/* MAIN */}

      <section className="relative z-10 mx-auto max-w-4xl px-6 py-12">


        {/* SUCCESS */}

        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-3xl shadow-[0_0_50px_rgba(52,211,153,0.12)]">
            ✓
          </div>

          <div className="mt-6 text-xs font-semibold tracking-[0.3em] text-emerald-400">
            CERTIFICATE VERIFIED
          </div>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Valid Certificate
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
            This certificate matches a registered record in the
            Legal Metrology Online Verification System.
          </p>

        </div>


        {/* CERTIFICATE CARD */}

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] shadow-2xl backdrop-blur-xl">


          {/* TITLE */}

          <div className="border-b border-white/10 bg-white/[0.025] px-6 py-7 text-center md:px-10">

            <div className="text-[10px] font-semibold tracking-[0.3em] text-blue-400">
              GOVERNMENT VERIFICATION RECORD
            </div>

            <h2 className="mt-3 text-2xl font-bold">
              LEGAL METROLOGY
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              Certificate of Verification
            </p>

          </div>


          {/* BODY */}

          <div className="px-6 py-8 md:px-10">


            {/* CERTIFICATE NUMBER */}

            <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.035] p-6 text-center">

              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
                Certificate Number
              </div>

              <div className="mt-3 break-all font-mono text-xl font-bold tracking-wider text-emerald-300">
                {certificate.certificateNumber}
              </div>

              <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full bg-emerald-400/10 px-4 py-2 text-[10px] font-bold tracking-wider text-emerald-300">

                ✓ {isValid ? "VALID" : "EXPIRED"}

              </div>

            </div>


            {/* DETAILS */}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              <Detail
                label="Instrument"
                value={certificate.instrumentName}
              />

              <Detail
                label="Instrument ID"
                value={certificate.instrumentId}
              />

              <Detail
                label="Verification Date"
                value={certificate.issuedDate}
              />

              <Detail
                label="Valid Until"
                value={certificate.validUntil}
              />

            </div>


            {/* AUTHENTICITY */}

            <div className="mt-6 rounded-2xl border border-blue-400/10 bg-blue-400/[0.025] p-5">

              <div className="flex gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10">
                  ✓
                </div>

                <div>

                  <div className="text-sm font-semibold text-slate-200">
                    Authenticity Confirmed
                  </div>

                  <p className="mt-1 text-xs leading-6 text-slate-500">
                    This certificate reference was successfully matched
                    against the registered verification record.
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* FOOTER */}

          <div className="border-t border-white/10 bg-black/10 px-6 py-5 text-center text-[10px] leading-5 text-slate-600">
            Digital Verification • Secure • Trackable
          </div>

        </div>


        <div className="mt-8 text-center text-[10px] uppercase tracking-[0.2em] text-slate-700">
          Legal Metrology Online Verification System
        </div>

      </section>

    </main>
  );
}


/* =========================================================
   DETAIL COMPONENT
========================================================= */

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.025] p-5">

      <div className="text-[10px] uppercase tracking-wider text-slate-600">
        {label}
      </div>

      <div className="mt-2 text-sm font-semibold text-slate-200">
        {value}
      </div>

    </div>
  );
}


/* =========================================================
   PAGE WRAPPER
========================================================= */

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#030712] text-white">
          <div className="text-sm text-slate-500">
            Verifying certificate...
          </div>
        </main>
      }
    >
      <VerificationContent />
    </Suspense>
  );
}