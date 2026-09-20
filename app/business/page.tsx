"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Application,
  Certificate,
  Instrument,
} from "@/app/lib/businessStore";

export default function BusinessDashboard() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
  const loadDashboard = async () => {
    try {
      const session = localStorage.getItem("legal-metrology-session");

      if (!session) {
        window.location.href = "/login";
        return;
      }

      const user = JSON.parse(session);

      if (!user.businessId) {
        console.error("No business ID found in session.");
        return;
      }

      const response = await fetch(
        `/api/business/dashboard?businessId=${encodeURIComponent(
          user.businessId
        )}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error(data.message || "Failed to load dashboard.");
        return;
      }

      setInstruments(data.instruments || []);
      setApplications(data.applications || []);
      setCertificates(data.certificates || []);
    } catch (error) {
      console.error("Dashboard loading error:", error);
    }
  };

  loadDashboard();
}, []);

  const pendingApplications = applications.filter(
    (application) =>
      application.status === "Pending" ||
      application.status === "Under Review"
  ).length;

  const verifiedCertificates = certificates.filter(
    (certificate) => certificate.status === "Valid"
  ).length;

  return (
    <main className="min-h-screen bg-[#030712] text-white">

      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="fixed inset-0 -z-0 overflow-hidden">

        <div className="absolute left-[-220px] top-[80px] h-[550px] w-[550px] rounded-full bg-blue-600/10 blur-[150px]" />

        <div className="absolute right-[-180px] top-[250px] h-[550px] w-[550px] rounded-full bg-cyan-500/10 blur-[150px]" />

        <div className="absolute bottom-[-250px] left-[35%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[150px]" />

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

      <nav className="relative z-20 border-b border-white/10 bg-[#030712]/75 backdrop-blur-xl">

        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 lg:px-10">

          {/* LOGO */}

          <Link
            href="/business"
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-xl shadow-[0_0_30px_rgba(37,99,235,0.12)]">
              ⚖
            </div>

            <div>

              <div className="text-sm font-bold tracking-[0.24em]">
                LEGAL METROLOGY
              </div>

              <div className="mt-0.5 text-xs text-slate-500">
                Online Verification System
              </div>

            </div>

          </Link>


          {/* NAVIGATION */}

          <div className="hidden items-center gap-2 md:flex">

            <Link
              href="/business"
              className="rounded-xl bg-white/[0.06] px-4 py-2.5 text-xs font-semibold text-white"
            >
              Dashboard
            </Link>

            <Link
              href="/business/instruments"
              className="rounded-xl px-4 py-2.5 text-xs text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Instruments
            </Link>

            <Link
              href="/business/applications"
              className="rounded-xl px-4 py-2.5 text-xs text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Applications
            </Link>

            <Link
              href="/business/certificates"
              className="rounded-xl px-4 py-2.5 text-xs text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Certificates
            </Link>

          </div>


          {/* USER */}

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">

              <div className="text-xs font-semibold text-slate-200">
                Registered Business
              </div>

              <div className="text-[10px] text-slate-600">
                Business Account
              </div>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/20 bg-blue-400/10 text-sm font-bold text-blue-200">
              B
            </div>

          </div>

        </div>

      </nav>


      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <section className="relative z-10 mx-auto max-w-[1500px] px-6 py-10 lg:px-10">


        {/* =======================================================
            WELCOME HEADER
        ======================================================= */}

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

          <div>

            <div className="text-xs font-semibold tracking-[0.25em] text-blue-400">
              BUSINESS PORTAL
            </div>

            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Verification Command Center
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
              Manage registered instruments, submit verification requests,
              monitor applications and access your digital Legal Metrology
              certificates from one secure portal.
            </p>

          </div>


          <Link
            href="/business/instruments"
            className="group flex w-fit items-center gap-3 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold shadow-[0_12px_40px_rgba(37,99,235,0.2)] transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_16px_50px_rgba(37,99,235,0.3)]"
          >

            <span>
              Manage Instruments
            </span>

            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>

          </Link>

        </div>


        {/* =======================================================
            STATISTICS
        ======================================================= */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            icon="⚖"
            label="Registered Instruments"
            value={String(instruments.length)}
            description="Active instruments"
          />

          <StatCard
            icon="◫"
            label="Applications"
            value={String(applications.length)}
            description="Total submissions"
          />

          <StatCard
            icon="◌"
            label="Under Processing"
            value={String(pendingApplications)}
            description="Awaiting completion"
          />

          <StatCard
            icon="✓"
            label="Valid Certificates"
            value={String(verifiedCertificates)}
            description="Currently valid"
          />

        </div>


        {/* =======================================================
            MAIN ACTION CARDS
        ======================================================= */}

        <div className="mt-8 grid gap-5 md:grid-cols-3">


          {/* INSTRUMENTS */}

          <Link
            href="/business/instruments"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-blue-400/[0.045]"
          >

            <div className="absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition group-hover:bg-blue-500/20" />

            <div className="relative">

              <div className="flex items-start justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10 text-2xl">
                  ⚖
                </div>

                <span className="text-xl text-slate-600 transition group-hover:translate-x-1 group-hover:text-blue-300">
                  →
                </span>

              </div>

              <h2 className="mt-6 text-xl font-semibold">
                Instruments
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Register and manage your weighing and measuring instruments,
                including model, serial number, capacity and verification
                status.
              </p>

              <div className="mt-6 text-xs font-semibold text-blue-400">
                Manage Instruments →
              </div>

            </div>

          </Link>


          {/* APPLICATIONS */}

          <Link
            href="/business/applications"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/[0.045]"
          >

            <div className="absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl transition group-hover:bg-cyan-500/20" />

            <div className="relative">

              <div className="flex items-start justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-2xl">
                  ◫
                </div>

                <span className="text-xl text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-300">
                  →
                </span>

              </div>

              <h2 className="mt-6 text-xl font-semibold">
                Applications
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Submit verification and re-verification requests and track
                their progress through the inspection workflow.
              </p>

              <div className="mt-6 text-xs font-semibold text-cyan-400">
                Track Applications →
              </div>

            </div>

          </Link>


          {/* CERTIFICATES */}

          <Link
            href="/business/certificates"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-emerald-400/[0.045]"
          >

            <div className="absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl transition group-hover:bg-emerald-500/20" />

            <div className="relative">

              <div className="flex items-start justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-2xl">
                  ✓
                </div>

                <span className="text-xl text-slate-600 transition group-hover:translate-x-1 group-hover:text-emerald-300">
                  →
                </span>

              </div>

              <h2 className="mt-6 text-xl font-semibold">
                Certificates
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Access digitally generated verification certificates and
                check the validity period of certified instruments.
              </p>

              <div className="mt-6 text-xs font-semibold text-emerald-400">
                View Certificates →
              </div>

            </div>

          </Link>

        </div>


        {/* =======================================================
            LOWER SECTION
        ======================================================= */}

        <div className="mt-8 grid gap-5 lg:grid-cols-3">


          {/* RECENT APPLICATIONS */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl lg:col-span-2">

            <div className="flex items-center justify-between">

              <div>

                <div className="text-xs font-semibold tracking-[0.18em] text-slate-600">
                  ACTIVITY
                </div>

                <h2 className="mt-2 text-xl font-semibold">
                  Recent Applications
                </h2>

              </div>

              <Link
                href="/business/applications"
                className="text-xs font-semibold text-blue-400 hover:text-blue-300"
              >
                View All →
              </Link>

            </div>


            <div className="mt-6 space-y-3">

              {applications.length === 0 ? (

                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center">

                  <div className="text-2xl">
                    ◫
                  </div>

                  <p className="mt-3 text-sm text-slate-500">
                    No applications submitted yet.
                  </p>

                  <Link
                    href="/business/instruments"
                    className="mt-4 inline-block text-xs font-semibold text-blue-400"
                  >
                    Start an Application →
                  </Link>

                </div>

              ) : (

                applications.slice(0, 3).map((application) => (

                  <RecentApplication
                    key={application.id}
                    application={application}
                  />

                ))

              )}

            </div>

          </div>


          {/* ALERT PANEL */}

          <div className="rounded-3xl border border-amber-400/10 bg-amber-400/[0.025] p-6 backdrop-blur-xl">

            <div className="flex items-center justify-between">

              <div>

                <div className="text-xs font-semibold tracking-[0.18em] text-amber-400">
                  MONITORING
                </div>

                <h2 className="mt-2 text-xl font-semibold">
                  Alerts
                </h2>

              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10">
                ⚠
              </div>

            </div>


            <div className="mt-6 rounded-2xl border border-amber-400/10 bg-amber-400/[0.035] p-5">

              <div className="text-xs font-semibold text-amber-300">
                CERTIFICATE MONITORING
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Stay informed about verification certificates approaching
                their expiry dates.
              </p>

              <Link
                href="/business/alerts"
                className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-amber-300 transition hover:text-amber-200"
              >
                View Verification Alerts
                <span>
                  →
                </span>
              </Link>

            </div>


            <div className="mt-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5">

              <div className="text-xs font-semibold text-slate-300">
                LEGAL COMPLIANCE
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                Keep all commercial weighing and measuring instruments
                verified within their prescribed validity period.
              </p>

            </div>

          </div>

        </div>


        {/* =======================================================
            QUICK ACTIONS
        ======================================================= */}

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl">

          <div className="text-xs font-semibold tracking-[0.18em] text-slate-600">
            QUICK ACTIONS
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">

            <Link
              href="/business/instruments"
              className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-blue-400/20 hover:bg-blue-400/[0.04]"
            >

              <div className="text-sm font-semibold">
                + Register Instrument
              </div>

              <div className="mt-1 text-xs text-slate-600">
                Add a new weighing or measuring instrument
              </div>

            </Link>


            <Link
              href="/business/applications"
              className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.04]"
            >

              <div className="text-sm font-semibold">
                ◫ Track Application
              </div>

              <div className="mt-1 text-xs text-slate-600">
                Monitor your submitted verification requests
              </div>

            </Link>


            <Link
              href="/business/certificates"
              className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-emerald-400/20 hover:bg-emerald-400/[0.04]"
            >

              <div className="text-sm font-semibold">
                ✓ View Certificates
              </div>

              <div className="mt-1 text-xs text-slate-600">
                Open your digital verification documents
              </div>

            </Link>

          </div>

        </div>


        {/* =======================================================
            FOOTER
        ======================================================= */}

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/5 pt-6 text-[10px] text-slate-700 sm:flex-row">

          <div>
            Legal Metrology Online Verification System
          </div>

          <div>
            Digital • Transparent • Trackable
          </div>

        </div>

      </section>

    </main>
  );
}


/* ===============================================================
   STAT CARD
=============================================================== */

function StatCard({
  icon,
  label,
  value,
  description,
}: {
  icon: string;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white/15">

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-lg">
          {icon}
        </div>

        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/70 shadow-[0_0_12px_rgba(52,211,153,0.5)]" />

      </div>

      <div className="mt-5">

        <div className="text-3xl font-bold">
          {value}
        </div>

        <div className="mt-1 text-sm font-medium text-slate-300">
          {label}
        </div>

        <div className="mt-1 text-[10px] text-slate-600">
          {description}
        </div>

      </div>

    </div>
  );
}


/* ===============================================================
   RECENT APPLICATION
=============================================================== */

function RecentApplication({
  application,
}: {
  application: Application;
}) {

  const statusClass =
    application.status === "Verified"
      ? "bg-emerald-400/10 text-emerald-300"
      : application.status === "Rejected"
        ? "bg-red-400/10 text-red-300"
        : application.status === "Under Review"
          ? "bg-blue-400/10 text-blue-300"
          : "bg-amber-400/10 text-amber-300";

  return (
    <Link
      href="/business/applications"
      className="flex flex-col justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-white/10 hover:bg-white/[0.04] sm:flex-row sm:items-center"
    >

      <div className="flex items-center gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-400/[0.05]">
          ◫
        </div>

        <div>

          <div className="text-sm font-semibold">
            {application.instrumentName}
          </div>

          <div className="mt-1 text-[10px] text-slate-600">
            {application.id}
          </div>

        </div>

      </div>


      <div className="flex items-center gap-4">

        <span
          className={`rounded-full px-3 py-1.5 text-[9px] font-semibold ${statusClass}`}
        >
          {application.status.toUpperCase()}
        </span>

        <span className="text-slate-600">
          →
        </span>

      </div>

    </Link>
  );
}