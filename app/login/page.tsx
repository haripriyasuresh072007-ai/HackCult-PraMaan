"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Role = "business" | "officer" | "admin";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("business");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/business");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Blue glow */}
        <div className="absolute left-[15%] top-[15%] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[130px]" />

        {/* Cyan glow */}
        <div className="absolute bottom-[5%] right-[10%] h-[380px] w-[380px] rounded-full bg-cyan-400/10 blur-[130px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

      </div>


      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav className="relative z-20 flex items-center justify-between px-6 py-5 lg:px-10">

        <Link href="/" className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-400/10 text-xl shadow-[0_0_25px_rgba(59,130,246,0.12)]">
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


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10 flex min-h-[calc(100vh-90px)] items-center justify-center px-5 py-10">

        <div className="w-full max-w-[1050px]">

          {/* Heading */}

          <div className="mb-8 text-center">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">

              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />

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


          {/* =================================================
              LOGIN CARD
          ================================================== */}

          <div className="mx-auto overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl">

            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">


              {/* =============================================
                  LEFT SIDE — ROLE SELECTION
              ============================================== */}

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


                {/* Roles */}

                <div className="mt-7 space-y-3">


                  {/* BUSINESS */}

                  <button
                    type="button"
                    onClick={() => setRole("business")}
                    className={`group w-full rounded-2xl border p-4 text-left transition-all ${
                      role === "business"
                        ? "border-blue-400/40 bg-blue-400/10 shadow-[0_0_30px_rgba(59,130,246,0.08)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
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

                        <p className="font-semibold text-white">
                          Business
                        </p>

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
                        ? "border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.08)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
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

                        <p className="font-semibold text-white">
                          LMO Officer
                        </p>

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
                        ? "border-violet-400/40 bg-violet-400/10 shadow-[0_0_30px_rgba(139,92,246,0.08)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
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

                        <p className="font-semibold text-white">
                          Administrator
                        </p>

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


                {/* Security */}

                <div className="mt-7 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.03] p-4">

                  <div className="flex gap-3">

                    <span className="mt-0.5 text-emerald-300">
                      ✓
                    </span>

                    <div>

                      <p className="text-xs font-semibold text-emerald-300">
                        Secure access
                      </p>

                      <p className="mt-1 text-[10px] leading-5 text-slate-500">
                        Role-based access ensures users only see
                        the information and actions relevant to them.
                      </p>

                    </div>

                  </div>

                </div>

              </div>


              {/* =============================================
                  RIGHT SIDE — LOGIN FORM
              ============================================== */}

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
                    <span className="font-medium text-blue-300">
                      {role === "business"
                        ? "Business"
                        : role === "officer"
                        ? "LMO Officer"
                        : "Administrator"}
                    </span>
                  </p>

                </div>


                <form onSubmit={handleLogin} className="space-y-5">


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
                      className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-400/50 focus:bg-blue-400/[0.03] focus:ring-2 focus:ring-blue-400/10"
                    />

                  </div>


                  {/* PASSWORD */}

                  <div>

                    <div className="mb-2 flex items-center justify-between">

                      <label className="text-xs font-medium text-slate-400">
                        Password
                      </label>

                      <button
                        type="button"
                        className="text-[10px] text-blue-400 hover:text-blue-300"
                      >
                        Forgot password?
                      </button>

                    </div>

                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-400/50 focus:bg-blue-400/[0.03] focus:ring-2 focus:ring-blue-400/10"
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


                  {/* LOGIN BUTTON */}

                  {/* LOGIN BUTTON */}

<button
  type="button"
  onClick={() => {
    window.location.href = "/business";
  }}
  className="group relative mt-2 flex h-13 w-full items-center justify-center overflow-hidden rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(37,99,235,0.25)] transition hover:bg-blue-500 hover:shadow-[0_15px_45px_rgba(37,99,235,0.35)]"
>
  <span className="relative z-10">
    Enter Verification Portal
  </span>

  <span className="relative z-10 ml-2 transition-transform group-hover:translate-x-1">
    →
  </span>

  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
</button>

                </form>


                {/* DEMO ACCESS */}

                <div className="mt-8 rounded-2xl border border-blue-400/10 bg-blue-400/[0.035] p-4">

                  <div className="flex items-start gap-3">

                    <div className="mt-0.5 text-blue-300">
                      ◈
                    </div>

                    <div>

                      <p className="text-xs font-semibold text-blue-200">
                        Hackathon Demo Mode
                      </p>

                      <p className="mt-1 text-[10px] leading-5 text-slate-500">
                        Authentication is simulated for this prototype.
                        No real credentials are required during the demo.
                      </p>

                    </div>

                  </div>

                </div>


                {/* Footer */}

                <div className="mt-7 flex items-center justify-between text-[10px] text-slate-600">

                  <span>
                    Legal Metrology Act, 2009
                  </span>

                  <span>
                    Secure Digital Infrastructure
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* Bottom trust indicators */}

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[10px] text-slate-600">

            <span className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              Role-based access
            </span>

            <span className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              Digital certificates
            </span>

            <span className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              QR authentication
            </span>

            <span className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              Verification tracking
            </span>

          </div>

        </div>

      </div>

    </main>
  );
}