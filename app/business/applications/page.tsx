"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Application,
  getApplications,
} from "@/app/lib/businessStore";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  return (
    <main className="min-h-screen bg-[#030712] text-white">

      {/* BACKGROUND */}

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


      {/* NAVBAR */}

      <nav className="relative z-10 flex items-center justify-between border-b border-white/10 bg-[#030712]/80 px-6 py-4 backdrop-blur-xl lg:px-10">

        <Link href="/business" className="flex items-center gap-3">

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


      {/* CONTENT */}

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:px-10">

        <div className="mb-8">

          <div className="text-xs font-semibold tracking-[0.2em] text-blue-400">
            APPLICATION MANAGEMENT
          </div>

          <h1 className="mt-2 text-4xl font-bold">
            Verification Applications
          </h1>

          <p className="mt-3 text-slate-500">
            Track verification and re-verification requests submitted for
            your instruments.
          </p>

        </div>


        {/* SUMMARY */}

        <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <SummaryCard
            label="Total Applications"
            value={String(applications.length)}
          />

          <SummaryCard
            label="Pending"
            value={String(
              applications.filter(
                (application) => application.status === "Pending"
              ).length
            )}
          />

          <SummaryCard
            label="Under Review"
            value={String(
              applications.filter(
                (application) => application.status === "Under Review"
              ).length
            )}
          />

          <SummaryCard
            label="Verified"
            value={String(
              applications.filter(
                (application) => application.status === "Verified"
              ).length
            )}
          />

        </div>


        {/* APPLICATION LIST */}

        <div className="space-y-4">

          {applications.length === 0 ? (

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-16 text-center">

              <div className="text-4xl">
                ◫
              </div>

              <h2 className="mt-4 text-xl font-semibold">
                No applications yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Once you submit an instrument for verification, your
                application will appear here.
              </p>

              <Link
                href="/business/instruments"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold hover:bg-blue-500"
              >
                View Instruments →
              </Link>

            </div>

          ) : (

            applications.map((application) => (

              <ApplicationCard
                key={application.id}
                application={application}
              />

            ))

          )}

        </div>

      </section>

    </main>
  );
}


/* SUMMARY CARD */

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (

    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">

      <div className="text-xs uppercase tracking-wider text-slate-500">
        {label}
      </div>

      <div className="mt-3 text-3xl font-bold">
        {value}
      </div>

    </div>

  );
}


/* APPLICATION CARD */

function ApplicationCard({
  application,
}: {
  application: Application;
}) {

  const statusStyle =
    application.status === "Verified"
      ? "bg-emerald-400/10 text-emerald-300"
      : application.status === "Rejected"
        ? "bg-red-400/10 text-red-300"
        : application.status === "Under Review"
          ? "bg-blue-400/10 text-blue-300"
          : "bg-amber-400/10 text-amber-300";


  return (

    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition hover:border-blue-400/20">

      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">


        {/* LEFT */}

        <div className="flex gap-5">

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-400/10 bg-blue-400/[0.06] text-xl">
            ◫
          </div>


          <div>

            <div className="flex flex-wrap items-center gap-3">

              <h2 className="font-semibold">
                {application.instrumentName}
              </h2>

              <span
                className={`rounded-full px-3 py-1 text-[10px] font-semibold ${statusStyle}`}
              >
                {application.status.toUpperCase()}
              </span>

            </div>


            <div className="mt-2 text-sm text-slate-500">
              {application.type}
            </div>


            <div className="mt-3 flex flex-wrap gap-5 text-xs text-slate-600">

              <span>
                {application.id}
              </span>

              <span>
                {application.location}
              </span>

              <span>
                Submitted {application.submitted}
              </span>

            </div>

          </div>

        </div>


        {/* STATUS */}

        <div className="min-w-[160px] lg:text-right">

          <div className="text-[10px] uppercase tracking-wider text-slate-600">
            Application Status
          </div>

          <div className="mt-2 text-sm font-semibold">
            {application.status === "Verified"
              ? "✓ Verification Complete"
              : application.status === "Under Review"
                ? "Officer Reviewing"
                : application.status === "Rejected"
                  ? "Application Rejected"
                  : "Awaiting Officer Assignment"}
          </div>

        </div>

      </div>

    </div>

  );
}