"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

type Instrument = {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  location: string;
  type: string;
  capacity: string;
  validUntil: string;
  status: string;
  lastVerified: string;
  nextVerification: string;
};

function ApplyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const instrumentId = searchParams.get("instrument");

  const [instrument, setInstrument] = useState<Instrument | null>(null);
  const [loading, setLoading] = useState(true);

  const [type, setType] = useState<
    "Original Verification" | "Re-verification"
  >("Re-verification");

  const [location, setLocation] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* =========================================================
     LOAD SELECTED INSTRUMENT FROM DATABASE
  ========================================================= */

  useEffect(() => {
    if (!instrumentId) {
      setLoading(false);
      return;
    }

    const loadInstrument = async () => {
      try {
        const response = await fetch("/api/instruments");

        const data = await response.json();

        if (!response.ok || !data.success) {
          console.error("Unable to load instruments");
          return;
        }

        const selected = data.instruments.find(
          (item: Instrument) => item.id === instrumentId
        );

        if (selected) {
          setInstrument(selected);
          setLocation(selected.location);
        }
      } catch (error) {
        console.error("Failed to load instrument:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInstrument();
  }, [instrumentId]);

  /* =========================================================
     SUBMIT APPLICATION TO DATABASE
  ========================================================= */

  const submitApplication = async () => {
    if (!instrument || !preferredDate || !location || submitting) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          business: "Current Business",
          instrument: instrument.name,
          instrumentId: instrument.id,
          type,
          location,
          submitted: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          priority: "Normal",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to submit application.");
        return;
      }

      alert("Application submitted successfully.");

      router.push("/business/applications");
    } catch (error) {
      console.error("APPLICATION SUBMIT ERROR:", error);
      alert("Unable to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030712] text-white">
        <div className="text-center">
          <div className="text-3xl animate-pulse">⚖</div>

          <p className="mt-4 text-sm text-slate-500">
            Loading verification form...
          </p>
        </div>
      </main>
    );
  }

  /* =========================================================
     INSTRUMENT NOT FOUND
  ========================================================= */

  if (!instrument) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030712] text-white">
        <div className="text-center">
          <div className="text-4xl">⚠</div>

          <h1 className="mt-4 text-xl font-semibold">
            Instrument not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Please select an instrument before applying
            for verification.
          </p>

          <Link
            href="/business/instruments"
            className="mt-5 inline-block text-sm text-blue-400 transition hover:text-blue-300"
          >
            ← Return to Instruments
          </Link>
        </div>
      </main>
    );
  }

  /* =========================================================
     MAIN PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#030712] text-white">

      {/* NAVIGATION */}

      <nav className="border-b border-white/10 bg-[#030712]/80 px-6 py-4 backdrop-blur-xl lg:px-10">

        <div className="mx-auto flex max-w-7xl items-center justify-between">

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
                Verification Portal
              </div>
            </div>
          </Link>

          <Link
            href="/business/instruments"
            className="rounded-xl border border-white/10 px-4 py-2 text-xs text-slate-400 transition hover:border-white/20 hover:text-white"
          >
            ← Instruments
          </Link>

        </div>

      </nav>

      {/* FORM */}

      <section className="mx-auto max-w-4xl px-6 py-12">

        {/* HEADER */}

        <div className="mb-8">

          <div className="text-xs font-semibold tracking-[0.2em] text-blue-400">
            NEW APPLICATION
          </div>

          <h1 className="mt-2 text-4xl font-bold">
            Apply for Verification
          </h1>

          <p className="mt-3 text-slate-500">
            Submit this instrument for Legal Metrology verification.
          </p>

        </div>

        {/* CARD */}

        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl md:p-8">

          {/* SELECTED INSTRUMENT */}

          <div className="rounded-2xl border border-blue-400/10 bg-blue-400/[0.04] p-5">

            <div className="text-xs uppercase tracking-wider text-slate-600">
              Selected Instrument
            </div>

            <div className="mt-2 text-xl font-semibold">
              {instrument.name}
            </div>

            <div className="mt-2 text-sm text-slate-500">
              {instrument.manufacturer} • {instrument.model}
            </div>

            <div className="mt-2 text-xs text-slate-600">
              Serial Number: {instrument.serialNumber}
            </div>

            <div className="mt-3 flex flex-wrap gap-3">

              <span className="rounded-full border border-blue-400/10 bg-blue-400/5 px-3 py-1 text-[10px] text-blue-300">
                {instrument.type}
              </span>

              <span className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[10px] text-slate-500">
                Capacity: {instrument.capacity}
              </span>

            </div>

          </div>

          {/* VERIFICATION TYPE */}

          <div className="mt-7">

            <label className="mb-3 block text-sm font-semibold">
              Verification Type
            </label>

            <div className="grid gap-3 md:grid-cols-2">

              <button
                type="button"
                onClick={() =>
                  setType("Original Verification")
                }
                className={`rounded-xl border p-4 text-left transition ${
                  type === "Original Verification"
                    ? "border-blue-400/40 bg-blue-400/10 shadow-[0_0_25px_rgba(59,130,246,0.08)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">

                  <div className="font-semibold">
                    Original Verification
                  </div>

                  {type === "Original Verification" && (
                    <span className="text-blue-300">
                      ✓
                    </span>
                  )}

                </div>

                <div className="mt-1 text-xs text-slate-500">
                  For newly manufactured or newly registered
                  instruments.
                </div>

              </button>

              <button
                type="button"
                onClick={() =>
                  setType("Re-verification")
                }
                className={`rounded-xl border p-4 text-left transition ${
                  type === "Re-verification"
                    ? "border-blue-400/40 bg-blue-400/10 shadow-[0_0_25px_rgba(59,130,246,0.08)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">

                  <div className="font-semibold">
                    Re-verification
                  </div>

                  {type === "Re-verification" && (
                    <span className="text-blue-300">
                      ✓
                    </span>
                  )}

                </div>

                <div className="mt-1 text-xs text-slate-500">
                  For instruments requiring periodic verification.
                </div>

              </button>

            </div>

          </div>

          {/* LOCATION */}

          <div className="mt-7">

            <label className="mb-2 block text-sm font-semibold">
              Preferred Inspection Location
            </label>

            <input
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm outline-none placeholder:text-slate-600 transition focus:border-blue-400/40 focus:bg-white/[0.06]"
              placeholder="Inspection location"
            />

          </div>

          {/* DATE */}

          <div className="mt-7">

            <label className="mb-2 block text-sm font-semibold">
              Preferred Inspection Date
            </label>

            <input
              type="date"
              value={preferredDate}
              onChange={(e) =>
                setPreferredDate(e.target.value)
              }
              min={new Date().toISOString().split("T")[0]}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition focus:border-blue-400/40 focus:bg-white/[0.06]"
            />

          </div>

          {/* DECLARATION */}

          <div className="mt-7 rounded-2xl border border-white/5 bg-white/[0.025] p-4">

            <div className="flex gap-3">

              <div className="text-blue-300">
                ◉
              </div>

              <p className="text-xs leading-5 text-slate-500">
                I confirm that the information provided for
                this instrument is accurate and that the
                instrument will be made available for inspection
                at the selected location and date.
              </p>

            </div>

          </div>

          {/* SUMMARY */}

          <div className="mt-7 rounded-2xl border border-white/5 bg-black/20 p-5">

            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
              Application Summary
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">

              <div>
                <div className="text-[10px] text-slate-600">
                  Instrument
                </div>

                <div className="mt-1 text-xs text-slate-300">
                  {instrument.name}
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-600">
                  Type
                </div>

                <div className="mt-1 text-xs text-slate-300">
                  {type}
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-600">
                  Inspection Date
                </div>

                <div className="mt-1 text-xs text-slate-300">
                  {preferredDate || "Not selected"}
                </div>
              </div>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              href="/business/instruments"
              className="rounded-xl border border-white/10 px-6 py-3.5 text-center text-sm text-slate-400 transition hover:border-white/20 hover:text-white"
            >
              Cancel
            </Link>

            <button
              type="button"
              onClick={submitApplication}
              disabled={!preferredDate || !location || submitting}
              className="rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold shadow-[0_10px_35px_rgba(37,99,235,0.2)] transition hover:bg-blue-500 hover:shadow-[0_15px_45px_rgba(37,99,235,0.3)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting
                ? "Submitting..."
                : "Submit Application →"}
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   PAGE WRAPPER
========================================================= */

export default function ApplyPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#030712] text-white">
          <div className="text-center">
            <div className="text-3xl animate-pulse">
              ⚖
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Loading verification form...
            </p>
          </div>
        </main>
      }
    >
      <ApplyForm />
    </Suspense>
  );
}