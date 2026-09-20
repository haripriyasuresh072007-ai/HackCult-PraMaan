"use client";

import { useEffect, useState, type ReactNode } from "react";

/* =========================================================
   TYPES
========================================================= */

type Certificate = {
  id: string;
  applicationId: string;
  business: string;
  instrument: string;
  issuedDate: string;
  validUntil: string;
  status: string;
  qrCode: string;
};

type Application = {
  id: string;
  business: string;
  instrument: string;
  instrumentId: string | null;
  type: string;
  location: string;
  submitted: string;
  priority: string;
  status: string;

  instrumentRef?: {
    id: string;
    name: string;
    manufacturer: string;
    model: string;
    serialNumber: string;
    location: string;
    type: string;
    capacity: string;
  } | null;

  certificate?: Certificate | null;
};

/* =========================================================
   OFFICER DASHBOARD
========================================================= */

export default function OfficerDashboard() {
  const [applications, setApplications] =
    useState<Application[]>([]);

  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const [filter, setFilter] =
    useState<"All" | "Pending" | "Completed">("All");

  const [loading, setLoading] = useState(true);

  /* =========================================================
     LOAD APPLICATIONS FROM PRISMA
  ========================================================= */

  const loadApplications = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/applications", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to load applications."
        );
      }

      setApplications(data.applications || []);
    } catch (error) {
      console.error(
        "Failed to load applications:",
        error
      );

      alert("Unable to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  /* =========================================================
     VERIFY APPLICATION
  ========================================================= */

  const handleVerify = async (
    applicationId: string
  ) => {
    const confirmed = window.confirm(
      "Verify this application and generate a certificate?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/applications/${applicationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Verified",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to verify application."
        );
      }

      await loadApplications();

      setSelectedApplication(null);

      alert(
        `Application verified successfully!\n\nCertificate Number:\n${data.certificate?.id || "Generated"}`
      );
    } catch (error) {
      console.error("VERIFY ERROR:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to verify application."
      );
    }
  };

  /* =========================================================
     REJECT APPLICATION
  ========================================================= */

  const handleReject = async (
    applicationId: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this application?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/applications/${applicationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Rejected",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to reject application."
        );
      }

      await loadApplications();

      setSelectedApplication(null);

      alert("Application rejected successfully.");
    } catch (error) {
      console.error("REJECT ERROR:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to reject application."
      );
    }
  };

  /* =========================================================
     FILTER APPLICATIONS
  ========================================================= */

  const filteredApplications =
    applications.filter((application) => {
      if (filter === "All") {
        return true;
      }

      if (filter === "Pending") {
        return application.status === "Pending";
      }

      return (
        application.status === "Verified" ||
        application.status === "Rejected"
      );
    });

  /* =========================================================
     COUNTS
  ========================================================= */

  const pendingCount =
    applications.filter(
      (application) =>
        application.status === "Pending"
    ).length;

  const verifiedCount =
    applications.filter(
      (application) =>
        application.status === "Verified"
    ).length;

  const rejectedCount =
    applications.filter(
      (application) =>
        application.status === "Rejected"
    ).length;

  const completedCount =
    verifiedCount + rejectedCount;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#030712] text-white">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

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

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="relative z-10 flex items-center justify-between border-b border-white/10 bg-[#030712]/80 px-6 py-4 backdrop-blur-xl lg:px-10">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-xl">
            ⚖
          </div>

          <div>

            <div className="text-sm font-bold tracking-[0.25em]">
              LEGAL METROLOGY
            </div>

            <div className="text-xs text-slate-500">
              Officer Verification Console
            </div>

          </div>

        </div>

        <div className="flex items-center gap-5">

          <div className="hidden text-right sm:block">

            <div className="text-sm font-medium">
              Officer Console
            </div>

            <div className="text-xs text-emerald-400">
              ● Online
            </div>

          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 font-semibold text-blue-200">
            LM
          </div>

        </div>

      </nav>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:px-10">

        {/* HEADER */}

        <div className="mb-10">

          <div className="mb-3 text-xs font-semibold tracking-[0.2em] text-blue-400">
            LEGAL METROLOGY OFFICER
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">

            Verification{" "}

            <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
              Command Center
            </span>

          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Review applications, conduct inspections,
            and digitally verify weighing and measuring
            instruments.
          </p>

        </div>

        {/* =====================================================
            STAT CARDS
        ===================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            label="Assigned Today"
            value={String(applications.length).padStart(
              2,
              "0"
            )}
            detail="Verification tasks"
            icon="◷"
          />

          <StatCard
            label="Pending Review"
            value={String(pendingCount).padStart(2, "0")}
            detail="Awaiting inspection"
            icon="!"
            yellow
          />

          <StatCard
            label="Verified"
            value={String(verifiedCount).padStart(
              2,
              "0"
            )}
            detail="Completed applications"
            icon="✓"
            green
          />

          <StatCard
            label="Compliance Rate"
            value={
              applications.length === 0
                ? "0%"
                : `${Math.round(
                    (verifiedCount /
                      applications.length) *
                      100
                  )}%`
            }
            detail={`${completedCount} processed`}
            icon="◈"
          />

        </div>

        {/* =====================================================
            APPLICATION SECTION
        ===================================================== */}

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl lg:p-7">

          <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>

              <div className="text-xs font-semibold tracking-[0.18em] text-slate-500">
                WORK QUEUE
              </div>

              <h2 className="mt-1 text-xl font-semibold">
                Assigned Applications
              </h2>

            </div>

            {/* FILTER */}

            <div className="flex gap-2">

              <FilterButton
                active={filter === "All"}
                onClick={() => setFilter("All")}
              >
                All
              </FilterButton>

              <FilterButton
                active={filter === "Pending"}
                onClick={() => setFilter("Pending")}
              >
                Pending
              </FilterButton>

              <FilterButton
                active={filter === "Completed"}
                onClick={() => setFilter("Completed")}
              >
                Completed
              </FilterButton>

            </div>

          </div>

          {/* APPLICATION LIST */}

          <div className="space-y-4">

            {loading ? (

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">

                <div className="text-sm text-slate-500">
                  Loading applications...
                </div>

              </div>

            ) : filteredApplications.length === 0 ? (

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">

                <div className="text-4xl">
                  ✓
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  No applications here
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  There are no applications matching
                  this filter.
                </p>

              </div>

            ) : (

              filteredApplications.map(
                (application) => (

                  <ApplicationCard
                    key={application.id}
                    application={application}
                    onInspect={() =>
                      setSelectedApplication(
                        application
                      )
                    }
                  />

                )
              )

            )}

          </div>

        </section>

        {/* =====================================================
            LOWER SECTION
        ===================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* PERFORMANCE */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">

            <div className="text-xs font-semibold tracking-[0.18em] text-slate-500">
              PERFORMANCE
            </div>

            <h2 className="mt-1 text-xl font-semibold">
              Inspection Overview
            </h2>

            <div className="mt-7 space-y-5">

              <Progress
                label="Verification completed"
                value={
                  applications.length === 0
                    ? "0%"
                    : `${Math.round(
                        (verifiedCount /
                          applications.length) *
                          100
                      )}%`
                }
                width={
                  applications.length === 0
                    ? "0%"
                    : `${Math.round(
                        (verifiedCount /
                          applications.length) *
                          100
                      )}%`
                }
              />

              <Progress
                label="Applications processed"
                value={
                  applications.length === 0
                    ? "0%"
                    : `${Math.round(
                        (completedCount /
                          applications.length) *
                          100
                      )}%`
                }
                width={
                  applications.length === 0
                    ? "0%"
                    : `${Math.round(
                        (completedCount /
                          applications.length) *
                          100
                      )}%`
                }
              />

              <Progress
                label="On-time inspections"
                value="91%"
                width="91%"
              />

            </div>

          </div>

          {/* SYSTEM */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">

            <div className="text-xs font-semibold tracking-[0.18em] text-slate-500">
              SYSTEM
            </div>

            <h2 className="mt-1 text-xl font-semibold">
              Verification Network
            </h2>

            <div className="mt-6 space-y-4">

              <SystemStatus
                name="Application Service"
                status="Operational"
              />

              <SystemStatus
                name="Certificate Service"
                status="Operational"
              />

              <SystemStatus
                name="QR Verification Service"
                status="Operational"
              />

              <SystemStatus
                name="Notification Service"
                status="Operational"
              />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          INSPECTION MODAL
      ===================================================== */}

      {selectedApplication && (

        <InspectionModal
          application={selectedApplication}
          onClose={() =>
            setSelectedApplication(null)
          }
          onVerify={() =>
            handleVerify(
              selectedApplication.id
            )
          }
          onReject={() =>
            handleReject(
              selectedApplication.id
            )
          }
        />

      )}

    </main>
  );
}

/* =========================================================
   APPLICATION CARD
========================================================= */

function ApplicationCard({
  application,
  onInspect,
}: {
  application: Application;
  onInspect: () => void;
}) {
  const isVerified =
    application.status === "Verified";

  const isRejected =
    application.status === "Rejected";

  return (

    <div className="group rounded-2xl border border-white/10 bg-[#080f1e]/70 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-blue-400/20">

      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

        <div className="flex items-start gap-4">

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-400/10 bg-blue-400/[0.06] text-2xl">
            ⚖
          </div>

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="font-semibold">
                {application.instrument}
              </h3>

              <StatusBadge
                status={application.status}
              />

            </div>

            <div className="mt-1 text-xs text-slate-500">
              {application.id}
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-600">

              <span>
                {application.business}
              </span>

              <span>
                {application.type}
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

        <div className="flex items-center gap-3">

          <button
            onClick={onInspect}
            className="rounded-xl border border-white/10 px-5 py-3 text-xs font-semibold text-slate-300 transition hover:border-blue-400/30 hover:bg-blue-400/10 hover:text-blue-200"
          >

            {isVerified || isRejected
              ? "View Record"
              : "Inspect Application"}

            {" "}→

          </button>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    Pending:
      "bg-amber-400/10 text-amber-300",

    "Under Review":
      "bg-blue-400/10 text-blue-300",

    Verified:
      "bg-emerald-400/10 text-emerald-300",

    Rejected:
      "bg-red-400/10 text-red-300",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        styles[status] ||
        "bg-slate-400/10 text-slate-300"
      }`}
    >
      {status.toUpperCase()}
    </span>
  );
}

/* =========================================================
   FILTER BUTTON
========================================================= */

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "rounded-xl border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-semibold text-blue-300"
          : "rounded-xl border border-white/10 px-4 py-2 text-xs text-slate-500 hover:text-white"
      }
    >
      {children}
    </button>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  label,
  value,
  detail,
  icon,
  green,
  yellow,
}: {
  label: string;
  value: string;
  detail: string;
  icon: string;
  green?: boolean;
  yellow?: boolean;
}) {
  const iconColor = green
    ? "text-emerald-300 bg-emerald-400/10"
    : yellow
      ? "text-amber-300 bg-amber-400/10"
      : "text-blue-300 bg-blue-400/10";

  return (

    <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/20">

      <div className="flex items-start justify-between">

        <div>

          <div className="text-xs font-medium tracking-wider text-slate-500">
            {label}
          </div>

          <div className="mt-3 text-3xl font-bold">
            {value}
          </div>

          <div className="mt-2 text-xs text-slate-500">
            {detail}
          </div>

        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconColor}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

/* =========================================================
   PROGRESS
========================================================= */

function Progress({
  label,
  value,
  width,
}: {
  label: string;
  value: string;
  width: string;
}) {
  return (

    <div>

      <div className="mb-2 flex justify-between text-xs">

        <span className="text-slate-400">
          {label}
        </span>

        <span className="font-semibold text-blue-300">
          {value}
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/5">

        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
          style={{
            width,
          }}
        />

      </div>

    </div>
  );
}

/* =========================================================
   SYSTEM STATUS
========================================================= */

function SystemStatus({
  name,
  status,
}: {
  name: string;
  status: string;
}) {
  return (

    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.025] px-4 py-3">

      <div className="flex items-center gap-3">

        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />

        <span className="text-sm text-slate-300">
          {name}
        </span>

      </div>

      <span className="text-xs text-emerald-300">
        {status}
      </span>

    </div>
  );
}

/* =========================================================
   INSPECTION MODAL
========================================================= */

function InspectionModal({
  application,
  onClose,
  onVerify,
  onReject,
}: {
  application: Application;
  onClose: () => void;
  onVerify: () => void;
  onReject: () => void;
}) {
  const [notes, setNotes] = useState("");
  const [allChecks, setAllChecks] = useState(true);

  const completed =
    application.status === "Verified" ||
    application.status === "Rejected";

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-5 backdrop-blur-md">

      <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-[#07101f] shadow-2xl">

        {/* HEADER */}

        <div className="flex items-start justify-between border-b border-white/10 p-6 md:p-8">

          <div>

            <div className="text-xs font-semibold tracking-[0.2em] text-blue-400">
              INSPECTION WORKSPACE
            </div>

            <h2 className="mt-2 text-2xl font-bold">
              {application.instrument}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {application.id} • {application.location}
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-3 py-2 text-slate-400 hover:text-white"
          >
            ✕
          </button>

        </div>

        {/* BODY */}

        <div className="space-y-6 p-6 md:p-8">

          {/* DETAILS */}

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            <Detail
              label="Instrument"
              value={application.instrument}
            />

            <Detail
              label="Business"
              value={application.business}
            />

            <Detail
              label="Application Type"
              value={application.type}
            />

            <Detail
              label="Location"
              value={application.location}
            />

            <Detail
              label="Application ID"
              value={application.id}
            />

            <Detail
              label="Submitted"
              value={application.submitted}
            />

            <Detail
              label="Priority"
              value={application.priority}
            />

            <Detail
              label="Current Status"
              value={application.status}
            />

            {application.instrumentRef && (
              <>
                <Detail
                  label="Manufacturer"
                  value={
                    application.instrumentRef
                      .manufacturer
                  }
                />

                <Detail
                  label="Model"
                  value={
                    application.instrumentRef.model
                  }
                />

                <Detail
                  label="Serial Number"
                  value={
                    application.instrumentRef
                      .serialNumber
                  }
                />

                <Detail
                  label="Capacity"
                  value={
                    application.instrumentRef.capacity
                  }
                />
              </>
            )}

          </div>

          {/* CHECKLIST */}

          <div>

            <div className="mb-3 flex items-center justify-between">

              <div className="text-sm font-semibold">
                Inspection Checklist
              </div>

              {!completed && (
                <button
                  onClick={() =>
                    setAllChecks(
                      (previous) => !previous
                    )
                  }
                  className="text-xs text-blue-300 hover:text-blue-200"
                >
                  {allChecks
                    ? "Uncheck all"
                    : "Check all"}
                </button>
              )}

            </div>

            <div className="grid gap-3 md:grid-cols-2">

              <Check
                label="Instrument identification verified"
                checked={allChecks}
                disabled={completed}
                onChange={setAllChecks}
              />

              <Check
                label="Manufacturer details verified"
                checked={allChecks}
                disabled={completed}
                onChange={setAllChecks}
              />

              <Check
                label="Serial number matches records"
                checked={allChecks}
                disabled={completed}
                onChange={setAllChecks}
              />

              <Check
                label="Accuracy within permissible limits"
                checked={allChecks}
                disabled={completed}
                onChange={setAllChecks}
              />

              <Check
                label="Sealing / stamping condition verified"
                checked={allChecks}
                disabled={completed}
                onChange={setAllChecks}
              />

              <Check
                label="Display and operation inspected"
                checked={allChecks}
                disabled={completed}
                onChange={setAllChecks}
              />

            </div>

          </div>

          {/* NOTES */}

          <div>

            <label className="mb-2 block text-sm font-semibold">
              Inspection Notes
            </label>

            <textarea
              value={notes}
              onChange={(event) =>
                setNotes(event.target.value)
              }
              disabled={completed}
              rows={4}
              placeholder="Enter observations, measurements, or remarks..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/40 disabled:opacity-50"
            />

          </div>

          {/* CERTIFICATE */}

          {application.certificate && (
            <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] p-5">

              <div className="text-xs font-semibold tracking-wider text-emerald-300">
                DIGITAL CERTIFICATE
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">

                <Detail
                  label="Certificate Number"
                  value={
                    application.certificate.id
                  }
                />

                <Detail
                  label="Issued Date"
                  value={
                    application.certificate
                      .issuedDate
                  }
                />

                <Detail
                  label="Valid Until"
                  value={
                    application.certificate
                      .validUntil
                  }
                />

                <Detail
                  label="Certificate Status"
                  value={
                    application.certificate.status
                  }
                />

              </div>

            </div>
          )}

          {/* READY MESSAGE */}

          {!completed && (

            <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] p-4">

              <div className="flex gap-3">

                <div className="text-emerald-300">
                  ✓
                </div>

                <div>

                  <div className="text-sm font-semibold">
                    Ready for digital verification
                  </div>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Approving this application will
                    generate a unique verification
                    certificate and QR verification
                    record.
                  </p>

                </div>

              </div>

            </div>

          )}

          {/* COMPLETED MESSAGE */}

          {completed && (

            <div
              className={
                application.status ===
                "Verified"
                  ? "rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] p-4"
                  : "rounded-2xl border border-red-400/10 bg-red-400/[0.04] p-4"
              }
            >

              <div className="flex gap-3">

                <div>
                  {application.status ===
                  "Verified"
                    ? "✓"
                    : "!"}
                </div>

                <div>

                  <div className="text-sm font-semibold">

                    {application.status ===
                    "Verified"
                      ? "Application verified"
                      : "Application rejected"}

                  </div>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    This application has already
                    been processed.
                  </p>

                </div>

              </div>

            </div>

          )}

          {/* ACTIONS */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 px-6 py-3.5 text-sm font-semibold text-slate-400 hover:text-white"
            >
              Close
            </button>

            {!completed && (
              <>

                <button
                  onClick={onReject}
                  className="rounded-xl border border-red-400/20 bg-red-400/[0.05] px-6 py-3.5 text-sm font-semibold text-red-300 hover:bg-red-400/10"
                >
                  Reject
                </button>

                <button
                  onClick={onVerify}
                  disabled={!allChecks}
                  className="rounded-xl bg-emerald-600 px-7 py-3.5 text-sm font-semibold shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ✓ Verify & Generate Certificate
                </button>

              </>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   DETAIL
========================================================= */

function Detail({
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

      <div className="mt-2 break-words text-sm font-medium text-slate-200">
        {value}
      </div>

    </div>
  );
}

/* =========================================================
   CHECKBOX
========================================================= */

function Check({
  label,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}) {
  return (

    <label
      className={`flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.025] p-4 ${
        disabled
          ? "opacity-60"
          : "cursor-pointer hover:border-blue-400/20"
      }`}
    >

      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        disabled={disabled}
        className="h-4 w-4 accent-blue-500"
      />

      <span className="text-xs text-slate-400">
        {label}
      </span>

    </label>
  );
}