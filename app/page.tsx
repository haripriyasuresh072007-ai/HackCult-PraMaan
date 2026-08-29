"use client";

import { useState } from "react";
import Link from "next/link";
export default function Home() {
  const [hovered, setHovered] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(37,99,235,0.20),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(14,165,233,0.12),transparent_30%)]" />

        <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute right-[5%] bottom-[10%] h-80 w-80 rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>


      {/* Navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-2xl shadow-[0_0_30px_rgba(59,130,246,0.25)]">
            ⚖
          </div>

          <div>
            <p className="text-sm font-semibold tracking-[0.25em] text-blue-300">
              LEGAL METROLOGY
            </p>

            <p className="text-xs text-slate-500">
              Digital Verification Infrastructure
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Platform
          </a>

          <a
            href="#impact"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Impact
          </a>

          <a
            href="#how"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            How it works
          </a>

          <a
            href="/login"
            className="rounded-xl border border-blue-400/30 bg-blue-500/10 px-5 py-2.5 text-sm font-medium text-blue-200 backdrop-blur-md transition hover:bg-blue-500/20"
          >
            Sign in
          </a>
        </div>
      </nav>


      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-20 pt-12 lg:grid-cols-2 lg:px-10 lg:pt-20">

        {/* Left */}
        <div className="relative z-10">

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            <span className="text-xs font-medium tracking-wider text-emerald-300">
              GOVERNMENT • DIGITAL • VERIFIED
            </span>
          </div>


          <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">

            Measure.
            <br />

            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Verify.
            </span>

            <br />

            <span className="text-white">
              Trust.
            </span>
          </h1>


          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
            A unified digital platform for verification and re-verification
            of weighing and measuring instruments under the Legal Metrology
            framework.
          </p>


          <div className="mt-9 flex flex-wrap gap-4">

            <a
              href="/login"
              className="group relative overflow-hidden rounded-2xl bg-blue-600 px-7 py-4 font-semibold shadow-[0_0_40px_rgba(37,99,235,0.35)] transition duration-300 hover:-translate-y-1 hover:bg-blue-500"
            >
              <span className="relative z-10 flex items-center gap-2">
                Enter Verification Portal
                <span className="transition group-hover:translate-x-1">
                  →
                </span>
              </span>

              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-full" />
            </a>


            <a
              href="#how"
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 font-medium text-slate-300 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.08]"
            >
              Explore Platform
            </a>

          </div>


          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap gap-7 text-xs text-slate-500">

            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              Secure verification
            </div>

            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              Digital certificates
            </div>

            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              QR authentication
            </div>

          </div>
        </div>


        {/* 3D Visual */}
        {/* 3D Visual */}
<div
  className="relative flex min-h-[560px] items-center justify-center lg:ml-4"
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
>
  {/* =========================
      BACKGROUND GLOW
  ========================== */}
  <div className="absolute h-80 w-80 rounded-full bg-blue-600/20 blur-[110px]" />

  <div className="absolute h-56 w-56 translate-x-16 translate-y-10 rounded-full bg-cyan-400/10 blur-[90px]" />


  {/* =========================
      3D ORBIT RINGS
  ========================== */}
  <div
    className="absolute h-[460px] w-[460px] rounded-full border border-blue-400/10"
    style={{
      transform: "perspective(900px) rotateX(65deg)",
    }}
  />

  <div
    className="absolute h-[370px] w-[370px] rounded-full border border-cyan-400/10"
    style={{
      transform: "perspective(900px) rotateX(65deg)",
    }}
  />

  <div
    className="absolute h-[520px] w-[520px] rounded-full border border-white/[0.04]"
    style={{
      transform: "perspective(900px) rotateX(65deg)",
    }}
  />


  {/* =========================
      FLOATING CARD — VERIFIED
  ========================== */}
  <div
    className="absolute left-[2%] top-[10%] z-20 hidden w-[185px] rounded-2xl border border-white/10 bg-[#11182b]/90 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:block"
    style={{
      transform: "perspective(800px) rotateY(8deg) rotateX(3deg)",
    }}
  >
    <div className="flex items-center justify-between">
      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
        Verified Instruments
      </p>

      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
    </div>

    <p className="mt-3 text-3xl font-bold text-white">
      2,481
    </p>

    <div className="mt-2 flex items-center gap-2">
      <span className="text-sm text-emerald-400">
        ↑ 12.4%
      </span>

      <span className="text-[10px] text-slate-600">
        this month
      </span>
    </div>
  </div>


  {/* =========================
      MAIN CERTIFICATE CARD
  ========================== */}
  <div
    className="relative z-10 w-[320px] rounded-[30px] border border-white/10 bg-gradient-to-br from-[#1a2135]/95 via-[#10182b]/95 to-[#0a1020]/95 p-6 shadow-[0_35px_100px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-500 sm:w-[330px]"
    style={{
      transform: hovered
        ? "perspective(1200px) rotateX(5deg) rotateY(-7deg) translateY(-10px) scale(1.02)"
        : "perspective(1200px) rotateX(2deg) rotateY(0deg)",
    }}
  >
    {/* Top shine */}
    <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />


    {/* Card header */}
    <div className="flex items-start justify-between gap-3">

      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
          Instrument
        </p>

        <p className="mt-1 text-[17px] font-semibold text-white">
          Digital Weighing Scale
        </p>
      </div>

      <div className="shrink-0 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold tracking-wider text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.08)]">
        ✓ VERIFIED
      </div>

    </div>


    {/* =========================
        SCALE VISUALIZATION
    ========================== */}
    <div className="relative mx-auto my-8 flex h-40 w-48 items-center justify-center">

      {/* Outer ring */}
      <div
        className="absolute h-40 w-40 rounded-full border border-blue-300/20 bg-blue-400/[0.03] shadow-[inset_0_0_60px_rgba(59,130,246,0.12),0_0_60px_rgba(59,130,246,0.08)]"
      />

      {/* Middle ring */}
      <div className="absolute h-28 w-28 rounded-full border border-cyan-300/20 bg-slate-950/60 shadow-[inset_0_0_30px_rgba(34,211,238,0.08)]" />

      {/* Inner display */}
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-blue-300/30 bg-gradient-to-br from-blue-500/15 to-cyan-400/5 shadow-[0_0_30px_rgba(59,130,246,0.15)]">

        <div className="text-center">
          <p className="text-[23px] font-bold tracking-tight text-cyan-300">
            25.00
          </p>

          <p className="mt-0.5 text-[9px] tracking-[0.3em] text-slate-500">
            KG
          </p>
        </div>

      </div>

      {/* Tiny status dot */}
      <div className="absolute right-[28px] top-[27px] h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />

    </div>


    {/* =========================
        CERTIFICATE DETAILS
    ========================== */}
    <div className="grid grid-cols-2 gap-3">

      <div className="rounded-2xl border border-white/5 bg-black/20 p-3.5">
        <p className="text-[9px] uppercase tracking-[0.12em] text-slate-500">
          Certificate
        </p>

        <p className="mt-1.5 text-[13px] font-semibold text-white">
          LM-2026-00124
        </p>
      </div>


      <div className="rounded-2xl border border-white/5 bg-black/20 p-3.5">
        <p className="text-[9px] uppercase tracking-[0.12em] text-slate-500">
          Valid Until
        </p>

        <p className="mt-1.5 text-[13px] font-semibold text-white">
          27 Aug 2027
        </p>
      </div>

    </div>


    {/* =========================
        QR AUTHENTICATION
    ========================== */}
    <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/5 bg-black/20 p-3.5">

      {/* QR visual */}
      <div className="grid h-14 w-14 shrink-0 grid-cols-5 gap-[2px] rounded-lg bg-white p-1.5">

        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className={
              [
                0,
                1,
                3,
                5,
                9,
                10,
                13,
                15,
                17,
                19,
                21,
                23,
                24,
              ].includes(i)
                ? "bg-black"
                : "bg-white"
            }
          />
        ))}

      </div>


      <div>
        <p className="text-sm font-semibold text-white">
          QR Authenticity
        </p>

        <p className="mt-1 text-[10px] leading-4 text-slate-500">
          Scan to verify certificate
        </p>

        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

          <span className="text-[9px] text-emerald-400">
            Authentic record
          </span>
        </div>
      </div>

    </div>

  </div>


  {/* =========================
      FLOATING CARD — ACCURACY
  ========================== */}
  <div
    className="absolute bottom-[8%] right-[0%] z-20 hidden w-[190px] rounded-2xl border border-white/10 bg-[#11182b]/90 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:block"
    style={{
      transform: "perspective(800px) rotateY(-8deg) rotateX(3deg)",
    }}
  >

    <div className="flex items-center justify-between">

      <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">
        Verification Accuracy
      </p>

      <span className="text-xs text-cyan-300">
        ●
      </span>

    </div>

    <div className="mt-2 flex items-end gap-2">

      <p className="text-3xl font-bold text-cyan-300">
        98.7%
      </p>

    </div>

    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">

      <div className="h-full w-[98.7%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.5)]" />

    </div>

    <p className="mt-2 text-[9px] text-slate-600">
      System verification confidence
    </p>

  </div>


  {/* =========================
      SMALL FLOATING STATUS
  ========================== */}
  <div className="absolute right-[8%] top-[2%] z-20 hidden rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 backdrop-blur-xl lg:block">

    <div className="flex items-center gap-2">

      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-400/10 text-[10px] text-emerald-300">
        ✓
      </span>

      <span className="text-[9px] font-medium tracking-wider text-slate-400">
        LIVE SYSTEM
      </span>

    </div>

  </div>

</div>

          {/* Orbit rings */}
          <div className="absolute h-[430px] w-[430px] rounded-full border border-blue-400/10 [transform:rotateX(65deg)]" />

          <div className="absolute h-[340px] w-[340px] rounded-full border border-cyan-400/10 [transform:rotateX(65deg)]" />

          <div className="absolute h-[500px] w-[500px] rounded-full border border-white/5 [transform:rotateX(65deg)]" />


          {/* Glow */}
          <div className="absolute h-72 w-72 rounded-full bg-blue-600/20 blur-[90px]" />


          {/* Main 3D Card */}
          <div
            className={`relative z-10 w-[360px] rounded-[32px] border border-white/10 bg-white/[0.07] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-500 ${
              hovered
                ? "rotate-y-6 -translate-y-4 scale-[1.03]"
                : "rotate-y-0"
            }`}
            style={{
              transform: hovered
                ? "perspective(1000px) rotateX(5deg) rotateY(-8deg) translateY(-12px)"
                : "perspective(1000px) rotateX(2deg) rotateY(0deg)",
            }}
          >

            {/* Card header */}
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Instrument
                </p>

                <p className="mt-1 text-lg font-semibold">
                  Digital Weighing Scale
                </p>
              </div>

              <div className="rounded-xl bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-300">
                VERIFIED
              </div>

            </div>


            {/* Scale visualization */}
            <div className="relative mx-auto my-10 flex h-44 w-52 items-center justify-center">

              <div className="absolute h-40 w-40 rounded-full border border-blue-300/20 bg-blue-400/5 shadow-[inset_0_0_50px_rgba(59,130,246,0.15),0_0_50px_rgba(59,130,246,0.1)]" />

              <div className="absolute h-28 w-28 rounded-full border border-cyan-300/20 bg-slate-900/70" />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-blue-300/30 bg-blue-500/10">

                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-300">
                    25.00
                  </p>

                  <p className="text-[10px] tracking-widest text-slate-500">
                    KG
                  </p>
                </div>

              </div>

            </div>


            {/* Details */}
            <div className="grid grid-cols-2 gap-3">

              <div className="rounded-2xl border border-white/5 bg-black/20 p-4">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">
                  Certificate
                </p>

                <p className="mt-1 text-sm font-medium">
                  LM-2026-00124
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-black/20 p-4">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">
                  Valid Until
                </p>

                <p className="mt-1 text-sm font-medium">
                  27 Aug 2027
                </p>
              </div>

            </div>


            {/* QR-style visual */}
            <div className="mt-4 flex items-center gap-4 rounded-2xl border border-white/5 bg-black/20 p-4">

              <div className="grid h-14 w-14 grid-cols-5 gap-[2px] rounded-lg bg-white p-1">

                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className={
                      [0, 1, 3, 5, 9, 10, 13, 15, 17, 19, 21, 23, 24].includes(
                        i
                      )
                        ? "bg-black"
                        : "bg-white"
                    }
                  />
                ))}

              </div>

              <div>
                <p className="text-sm font-medium">
                  QR Authenticity
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Scan to verify certificate
                </p>
              </div>

            </div>

          </div>


          {/* Floating cards */}

          <div className="absolute left-0 top-16 hidden animate-[bounce_4s_ease-in-out_infinite] rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl backdrop-blur-xl sm:block">

            <p className="text-[10px] uppercase tracking-widest text-slate-500">
              Verified Instruments
            </p>

            <p className="mt-1 text-2xl font-bold">
              2,481
            </p>

            <p className="mt-1 text-xs text-emerald-400">
              ↑ 12.4% this month
            </p>

          </div>


          <div className="absolute bottom-14 right-0 hidden animate-[bounce_5s_ease-in-out_infinite] rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl backdrop-blur-xl sm:block">

            <p className="text-[10px] uppercase tracking-widest text-slate-500">
              Verification Accuracy
            </p>

            <p className="mt-1 text-2xl font-bold text-cyan-300">
              98.7%
            </p>

            <div className="mt-2 h-1.5 w-28 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[98%] rounded-full bg-cyan-400" />
            </div>

          </div>

      </section>


      {/* Stats */}
      <section
        id="impact"
        className="mx-auto max-w-7xl px-6 pb-24 lg:px-10"
      >

        <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl md:grid-cols-4">

          {[
            ["2,481+", "Instruments Verified"],
            ["98.7%", "Digital Processing"],
            ["24/7", "Certificate Access"],
            ["100%", "QR Traceability"],
          ].map(([number, label]) => (

            <div
              key={label}
              className="border-b border-white/10 p-7 text-center transition hover:bg-white/[0.04] md:border-b-0 md:border-r last:md:border-r-0"
            >

              <p className="text-3xl font-bold text-white">
                {number}
              </p>

              <p className="mt-2 text-xs uppercase tracking-widest text-slate-500">
                {label}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* Features */}
      <section
        id="features"
        className="mx-auto max-w-7xl px-6 pb-28 lg:px-10"
      >

        <div className="mb-12 max-w-2xl">

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
            One unified platform
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            From application
            <span className="text-slate-500"> to verification.</span>
          </h2>

        </div>


        <div className="grid gap-5 md:grid-cols-3">

          {[
            {
              icon: "📋",
              title: "Digital Applications",
              text: "Businesses submit verification and re-verification applications through a single digital workflow.",
            },
            {
              icon: "🛡️",
              title: "Officer Verification",
              text: "LMOs receive assignments, record inspection results and digitally approve or reject instruments.",
            },
            {
              icon: "🔐",
              title: "Trusted Certificates",
              text: "Generate tamper-resistant digital certificates with unique certificate numbers and QR verification.",
            },
          ].map((feature) => (

            <div
              key={feature.title}
              className="group rounded-3xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-blue-400/20 hover:bg-white/[0.06]"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-2xl transition group-hover:scale-110">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                {feature.text}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* How it works */}
      <section
        id="how"
        className="border-y border-white/5 bg-white/[0.02]"
      >

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">

          <div className="text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Verification workflow
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              A certificate you can trust.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-slate-500">
              Every instrument moves through a transparent digital journey,
              creating a verifiable record from application to certificate.
            </p>

          </div>


          <div className="mt-16 grid gap-6 md:grid-cols-4">

            {[
              ["01", "Apply", "Business submits instrument details and verification request."],
              ["02", "Assign", "The system schedules and assigns the application to an officer."],
              ["03", "Inspect", "Officer records inspection findings and verification status."],
              ["04", "Certify", "A digital certificate and QR verification record are generated."],
            ].map(([number, title, text]) => (

              <div
                key={number}
                className="relative rounded-3xl border border-white/10 bg-[#080d20] p-7"
              >

                <span className="text-sm font-bold text-blue-400">
                  {number}
                </span>

                <h3 className="mt-5 text-xl font-semibold">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-28 text-center">

        <div className="relative overflow-hidden rounded-[36px] border border-blue-400/20 bg-gradient-to-br from-blue-500/10 via-white/[0.03] to-cyan-500/10 p-12 shadow-[0_30px_100px_rgba(0,0,0,0.35)] md:p-20">

          <div className="absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[100px]" />

          <div className="relative">

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300">
              Legal Metrology Digital India
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-bold md:text-5xl">
              Bring every measurement into the digital trust layer.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-slate-400">
              One platform for applications, inspections, certificates,
              verification and compliance monitoring.
            </p>

            <a
              href="/login"
              className="mt-9 inline-flex rounded-2xl bg-white px-7 py-4 font-semibold text-slate-900 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              Launch Verification Portal →
            </a>

          </div>

        </div>

      </section>


      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs text-slate-600 md:flex-row">

          <p>
            © 2026 Legal Metrology Verification Platform
          </p>

          <p>
            Digital • Transparent • Traceable
          </p>

        </div>

      </footer>

    </main>
  );
}