"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    businessName: "",
    registrationNo: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName: form.businessName,
          registrationNo: form.registrationNo,
          ownerName: form.ownerName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Registration failed.");
        setLoading(false);
        return;
      }

      setSuccess(
        "Registration successful! Redirecting you to login..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch {
      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] px-5 py-8 text-white">
      {/* BACKGROUND */}

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[10%] top-[10%] h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute bottom-[5%] right-[10%] h-[400px] w-[400px] rounded-full bg-cyan-400/10 blur-[140px]" />

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

      <nav className="relative z-10 mx-auto flex max-w-[1200px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-400/10 text-xl">
            ⚖
          </div>

          <div>
            <div className="text-sm font-bold tracking-[0.28em]">
              LEGAL METROLOGY
            </div>

            <div className="mt-0.5 text-[10px] tracking-[0.12em] text-slate-500">
              DIGITAL VERIFICATION INFRASTRUCTURE
            </div>
          </div>
        </Link>

        <Link
          href="/login"
          className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-400 transition hover:border-white/20 hover:text-white"
        >
          Already registered? Sign in
        </Link>
      </nav>

      {/* CONTENT */}

      <section className="relative z-10 mx-auto max-w-[1000px] py-10">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Business Registration
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Create your Business Account
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Register your business to submit instrument verification
            applications, track inspections and access digital certificates.
          </p>
        </div>

        {/* FORM CARD */}

        <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <form onSubmit={handleSubmit}>
            {/* BUSINESS DETAILS */}

            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400">
                Section 01
              </div>

              <h2 className="mt-2 text-xl font-semibold">
                Business Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter your official business details.
              </p>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field
                label="Business Name"
                name="businessName"
                placeholder="JK Enterprises"
                value={form.businessName}
                onChange={handleChange}
                required
              />

              <Field
                label="Business Registration Number"
                name="registrationNo"
                placeholder="LM-BUS-002"
                value={form.registrationNo}
                onChange={handleChange}
                required
              />

              <Field
                label="Owner / Authorized Person"
                name="ownerName"
                placeholder="Your full name"
                value={form.ownerName}
                onChange={handleChange}
                required
              />

              <Field
                label="Official Email"
                name="email"
                type="email"
                placeholder="name@business.com"
                value={form.email}
                onChange={handleChange}
                required
              />

              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="9876543210"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <Field
                label="City"
                name="city"
                placeholder="Chennai"
                value={form.city}
                onChange={handleChange}
                required
              />

              <Field
                label="State"
                name="state"
                placeholder="Tamil Nadu"
                value={form.state}
                onChange={handleChange}
                required
              />

              <Field
                label="Pincode"
                name="pincode"
                placeholder="600001"
                value={form.pincode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-xs font-medium text-slate-400">
                Business Address
              </label>

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Enter complete business address"
                className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-400/50 focus:bg-blue-400/[0.03]"
              />
            </div>

            {/* LOGIN DETAILS */}

            <div className="mt-10 border-t border-white/10 pt-8">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400">
                Section 02
              </div>

              <h2 className="mt-2 text-xl font-semibold">
                Account Security
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Create the password you will use to access the portal.
              </p>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field
                label="Password"
                name="password"
                type="password"
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={handleChange}
                required
              />

              <Field
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* MESSAGE */}

            {error && (
              <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-sm text-emerald-300">
                {success}
              </div>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="mt-8 flex h-13 w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(37,99,235,0.25)] transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Business Account →"}
            </button>

            <p className="mt-5 text-center text-xs text-slate-600">
              By registering, you agree to provide accurate business
              information for verification purposes.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   FIELD COMPONENT
========================================================= */

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-blue-400/50 focus:bg-blue-400/[0.03] focus:ring-2 focus:ring-blue-400/10"
      />
    </div>
  );
}