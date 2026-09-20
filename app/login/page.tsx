"use client";

import { useState } from "react";
import Link from "next/link";

type Role = "business" | "officer" | "admin";

export default function LoginPage() {
  const [role, setRole] = useState<Role>("business");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDemoLogin = () => {
    const session = {
      id: `demo-${role}`,
      name:
        role === "business"
          ? "Demo Business"
          : role === "officer"
            ? "Demo Legal Metrology Officer"
            : "Demo Administrator",
      email: email.trim() || "demo@pramaan.gov.in",
      role,
      businessId: role === "business" ? "demo-business" : null,
    };

    localStorage.setItem(
      "legal-metrology-session",
      JSON.stringify(session)
    );

    if (role === "business") {
      window.location.href = "/business";
      return;
    }

    if (role === "officer") {
      window.location.href = "/officer";
      return;
    }

    window.location.href = "/admin";
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[15%] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[130px]" />

        <div className="absolute bottom-[5%] right-[10%] h-[380px] w-[380px] rounded-full bg-cyan-400/10 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-400/10 text-xl">
            ⚖
          </div>

          <div>
            <p className="text-sm font-bold tracking-[0.28em] text-white">
              LEGAL METROLOGY
            </p>

            <p className="mt-0.5 text-[10px] tracking-[0.12em] text-slate-500">
              DIGITAL VERIFICATION INFRASTRUCTURE
            </p>
          </div>
        </Link>

        <Link
          href="/"
          className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-400 transition hover:border-white/20 hover:text-white"
        >
          ← Back to portal
        </Link>
      </nav>

      {/* MAIN */}
      <div className="relative z-10 flex min-h-[calc(100vh-90px)] items-center justify-center px-5 py-10">
        <div className="w-full max-w-[1050px]">
          {/* HEADING */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Secure Government Portal
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Enter the Verification Portal
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Access digital verification, inspection records and
              certification services under the Legal Metrology framework.
            </p>
          </div>

          {/* LOGIN CARD */}
          <div className="mx-auto overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              {/* ROLE SELECTION */}
              <div className="border-b border-white/10 p-7 lg:border-b-0 lg:border-r lg:p-9">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Step 01
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  Choose your role
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Select how you interact with the Legal Metrology
                  verification ecosystem.
                </p>

                <div className="mt-7 space-y-3">
                  {/* BUSINESS */}
                  <button
                    type="button"
                    onClick={() => setRole("business")}
                    className={`group w-full rounded-2xl border p-4 text-left transition-all ${
                      role === "business"
                        ? "border-blue-400/40 bg-blue-400/10"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${
                          role === "business"
                            ? "bg-blue-400/15 text-blue-300"
                            : "bg-white/5 text-slate-400"
                        }`}
                      >
                        ◈
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold">Business</p>
                        <p className="mt-1 text-xs text-slate-500">
                          Submit and track instrument verification
                        </p>
                      </div>

                      {role === "business" && (
                        <span className="text-blue-300">✓</span>
                      )}
                    </div>
                  </button>

                  {/* OFFICER */}
                  <button
                    type="button"
                    onClick={() => setRole("officer")}
                    className={`group w-full rounded-2xl border p-4 text-left transition-all ${
                      role === "officer"
                        ? "border-cyan-400/40 bg-cyan-400/10"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${
                          role === "officer"
                            ? "bg-cyan-400/15 text-cyan-300"
                            : "bg-white/5 text-slate-400"
                        }`}
                      >
                        ◉
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold">LMO Officer</p>
                        <p className="mt-1 text-xs text-slate-500">
                          Inspect, verify and issue certificates
                        </p>
                      </div>

                      {role === "officer" && (
                        <span className="text-cyan-300">✓</span>
                      )}
                    </div>
                  </button>

                  {/* ADMIN */}
                  <button
                    type="button"
                    onClick={() => setRole("admin")}
                    className={`group w-full rounded-2xl border p-4 text-left transition-all ${
                      role === "admin"
                        ? "border-violet-400/40 bg-violet-400/10"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${
                          role === "admin"
                            ? "bg-violet-400/15 text-violet-300"
                            : "bg-white/5 text-slate-400"
                        }`}
                      >
                        ◆
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold">Administrator</p>
                        <p className="mt-1 text-xs text-slate-500">
                          Monitor operations and manage users
                        </p>
                      </div>

                      {role === "admin" && (
                        <span className="text-violet-300">✓</span>
                      )}
                    </div>
                  </button>
                </div>

                {/* SECURITY */}
                <div className="mt-7 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.03] p-4">
                  <div className="flex gap-3">
                    <span className="mt-0.5 text-emerald-300">✓</span>

                    <div>
                      <p className="text-xs font-semibold text-emerald-300">
                        Secure access
                      </p>

                      <p className="mt-1 text-[10px] leading-5 text-slate-500">
                        Role-based access ensures users only see the
                        information and actions relevant to them.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* LOGIN FORM */}
              <div className="p-7 lg:p-9">
                <div className="mb-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Step 02
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    Sign in to continue
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Continue as{" "}
                    <span
                      className={
                        role === "business"
                          ? "font-medium text-blue-300"
                          : role === "officer"
                            ? "font-medium text-cyan-300"
                            : "font-medium text-violet-300"
                      }
                    >
                      {role === "business"
                        ? "Business"
                        : role === "officer"
                          ? "LMO Officer"
                          : "Administrator"}
                    </span>
                  </p>
                </div>

                <div className="space-y-5">
                  {/* EMAIL */}
                  <div>
                    <label className="mb-2 block text-xs font-medium text-slate-400">
                      Official email address
                    </label>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@organisation.gov.in"
                      className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-400/50"
                    />
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="mb-2 block text-xs font-medium text-slate-400">
                      Password
                    </label>

                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-400/50"
                    />
                  </div>

                  {/* REMEMBER */}
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/10 bg-black/20"
                    />

                    <span className="text-xs text-slate-500">
                      Keep me signed in on this device
                    </span>
                  </label>

                  {/* LOGIN */}
                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    className={`flex h-13 w-full items-center justify-center rounded-xl px-5 py-3.5 text-sm font-semibold text-white transition ${
                      role === "business"
                        ? "bg-blue-600 hover:bg-blue-500"
                        : role === "officer"
                          ? "bg-cyan-600 hover:bg-cyan-500"
                          : "bg-violet-600 hover:bg-violet-500"
                    }`}
                  >
                    Enter Verification Portal
                    <span className="ml-2">→</span>
                  </button>
                </div>

                {/* DEMO */}
                <div className="mt-8 rounded-2xl border border-blue-400/10 bg-blue-400/[0.035] p-4">
                  <p className="text-xs font-semibold text-blue-200">
                    Hackathon Demo Mode
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-slate-500">
                    Demo authentication allows judges to enter the appropriate
                    role and access the corresponding verification dashboard.
                  </p>
                </div>

                {/* FOOTER */}
                <div className="mt-7 flex items-center justify-between text-[10px] text-slate-600">
                  <span>Legal Metrology Act, 2009</span>
                  <span>Secure Digital Infrastructure</span>
                </div>
              </div>
            </div>
          </div>

          {/* TRUST */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[10px] text-slate-600">
            <span>✓ Role-based access</span>
            <span>✓ Digital certificates</span>
            <span>✓ QR authentication</span>
            <span>✓ Verification tracking</span>
          </div>
        </div>
      </div>
    </main>
  );
}