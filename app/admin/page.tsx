"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  getApplications,
  getCertificates,
  getInstruments,
  Application,
  Certificate,
  Instrument,
} from "@/app/lib/businessStore";

export default function AdminPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    setApplications(getApplications());
    setInstruments(getInstruments());
    setCertificates(getCertificates());
  }, []);

  const pending = applications.filter(
    (application) =>
      application.status === "Pending" ||
      application.status === "Under Review"
  ).length;

  const verified = applications.filter(
    (application) => application.status === "Verified"
  ).length;

  const businesses = useMemo(
    () => new Set(applications.map((application) => application.business)).size,
    [applications]
  );

  const logout = () => {
    localStorage.removeItem("legal-metrology-session");
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-[#05030d] text-white">
      {/* BACKGROUND */}

      <div className="fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[80px] h-[550px] w-[550px] rounded-full bg-violet-600/10 blur-[150px]" />

        <div className="absolute right-[-160px] top-[250px] h-[550px] w-[550px] rounded-full bg-blue-500/10 blur-[150px]" />

        <div className="absolute bottom-[-220px] left-[35%] h-[500px] w-[500px] rounded-full bg-fuchsia-500/10 blur-[150px]" />

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

      <nav className="relative z-10 border-b border-white/10 bg-[#05030d]/80 px-6 py-4 backdrop-blur-xl lg:px-10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/10 text-xl">
              ◆
            </div>

            <div>
              <div className="text-sm font-bold tracking-[0.24em]">
                LEGAL METROLOGY
              </div>

              <div className="mt-0.5 text-xs text-slate-500">
                Administrator Console
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/admin"
              className="rounded-xl bg-violet-400/10 px-4 py-2.5 text-xs font-semibold text-violet-200"
            >
              Overview
            </Link>

            <Link
              href="/officer"
              className="rounded-xl px-4 py-2.5 text-xs text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Officer Console
            </Link>

            <Link
              href="/business"
              className="rounded-xl px-4 py-2.5 text-xs text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Business View
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <div className="text-xs font-semibold text-slate-200">
                System Administrator
              </div>

              <div className="text-[10px] text-slate-600">
                Platform Control
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/20 bg-violet-400/10 font-bold text-violet-200">
              A
            </div>

            <button
              onClick={logout}
              className="rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-400 transition hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN */}

      <section className="relative z-10 mx-auto max-w-[1500px] px-6 py-10 lg:px-10">
        {/* HEADER */}

        <div>
          <div className="text-xs font-semibold tracking-[0.25em] text-violet-400">
            ADMINISTRATOR CONTROL CENTER
          </div>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            System Operations Overview
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-500">
            Monitor the complete Legal Metrology verification ecosystem,
            application queues, instrument activity and certificate issuance
            from one administrative workspace.
          </p>
        </div>

        {/* STATISTICS */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat
            label="Registered Businesses"
            value={String(businesses || 3)}
            icon="◆"
          />

          <Stat
            label="Instruments"
            value={String(instruments.length)}
            icon="⚖"
          />

          <Stat
            label="Pending Applications"
            value={String(pending)}
            icon="◫"
          />

          <Stat
            label="Certificates Issued"
            value={String(certificates.length + verified)}
            icon="✓"
          />
        </div>

        {/* APPLICATION MONITORING */}

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold tracking-[0.18em] text-slate-600">
                  CONTROL QUEUE
                </div>

                <h2 className="mt-2 text-xl font-semibold">
                  Application Monitoring
                </h2>
              </div>

              <span className="rounded-full bg-violet-400/10 px-3 py-1.5 text-[10px] font-semibold text-violet-300">
                {applications.length} TOTAL
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {applications.slice(0, 6).map((application) => (
                <div
                  key={application.id}
                  className="flex flex-col justify-between gap-3 rounded-2xl border border-white/5 bg-black/20 p-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <div className="text-sm font-semibold">
                      {application.instrumentName}
                    </div>

                    <div className="mt-1 text-[10px] text-slate-600">
                      {application.id} • {application.business}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1.5 text-[9px] font-semibold ${
                        application.status === "Verified"
                          ? "bg-emerald-400/10 text-emerald-300"
                          : application.status === "Rejected"
                            ? "bg-red-400/10 text-red-300"
                            : "bg-amber-400/10 text-amber-300"
                      }`}
                    >
                      {application.status.toUpperCase()}
                    </span>

                    <Link
                      href="/officer"
                      className="text-xs font-semibold text-violet-300 transition hover:text-violet-200"
                    >
                      Open →
                    </Link>
                  </div>
                </div>
              ))}

              {applications.length === 0 && (
                <p className="rounded-2xl border border-white/5 p-8 text-center text-sm text-slate-600">
                  No applications found.
                </p>
              )}
            </div>
          </section>

          {/* SYSTEM HEALTH */}

          <section className="rounded-3xl border border-violet-400/10 bg-violet-400/[0.025] p-6 backdrop-blur-xl">
            <div className="text-xs font-semibold tracking-[0.18em] text-violet-400">
              SYSTEM HEALTH
            </div>

            <h2 className="mt-2 text-xl font-semibold">
              Platform Status
            </h2>

            <div className="mt-6 space-y-3">
              <Health
                label="Application service"
                value="Operational"
              />

              <Health
                label="Officer workflow"
                value="Operational"
              />

              <Health
                label="Certificate service"
                value="Operational"
              />

              <Health
                label="QR verification"
                value="Operational"
              />
            </div>

            <div className="mt-6 rounded-2xl border border-violet-400/10 bg-black/20 p-5">
              <div className="text-xs font-semibold text-violet-300">
                ADMINISTRATOR ROLE
              </div>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                Administrators monitor the platform and coordinate the
                verification ecosystem. Businesses manage their own assets;
                officers perform inspections.
              </p>
            </div>
          </section>
        </div>

        {/* ACTIONS */}

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Action
            title="Manage Applications"
            text="Review the platform verification queue."
            href="/officer"
            icon="◫"
          />

          <Action
            title="Officer Workspace"
            text="Open the inspection and certificate workflow."
            href="/officer"
            icon="◉"
          />

          <Action
            title="Public Verification"
            text="Check a certificate using its QR record."
            href="/verify"
            icon="✓"
          />
        </div>

        {/* FOOTER */}

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/5 pt-6 text-[10px] text-slate-700 sm:flex-row">
          <span>
            Legal Metrology Online Verification System
          </span>

          <Link
            href="/"
            className="transition hover:text-slate-500"
          >
            ← Exit to Public Portal
          </Link>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   STAT
========================================================= */

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/10 bg-violet-400/[0.06] text-lg">
          {icon}
        </div>

        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </div>

      <div className="mt-5 text-3xl font-bold">
        {value}
      </div>

      <div className="mt-1 text-sm font-medium text-slate-300">
        {label}
      </div>

      <div className="mt-1 text-[10px] text-slate-600">
        Live platform view
      </div>
    </div>
  );
}

/* =========================================================
   HEALTH
========================================================= */

function Health({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/20 p-4">
      <span className="text-xs text-slate-400">
        {label}
      </span>

      <span className="flex items-center gap-2 text-[10px] font-semibold text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   ACTION
========================================================= */

function Action({
  title,
  text,
  href,
  icon,
}: {
  title: string;
  text: string;
  href: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-violet-400/20 hover:bg-violet-400/[0.04]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/10 bg-violet-400/[0.06] text-xl">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {text}
      </p>

      <div className="mt-5 text-xs font-semibold text-violet-300">
        Open workspace →
      </div>
    </Link>
  );
}