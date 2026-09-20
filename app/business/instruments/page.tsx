"use client";

import { useEffect, useState } from "react";
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

export default function InstrumentsPage() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);

  /* =========================================================
     LOAD INSTRUMENTS FROM DATABASE
  ========================================================= */

  useEffect(() => {
    loadInstruments();
  }, []);

  const loadInstruments = async () => {
    try {
      const response = await fetch("/api/instruments");

      const data = await response.json();

      if (data.success) {
        setInstruments(data.instruments);
      }
    } catch (error) {
      console.error("Failed to load instruments:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     ADD INSTRUMENT
  ========================================================= */

  const handleAdd = async (instrumentData: {
    name: string;
    type: string;
    manufacturer: string;
    model: string;
    serialNumber: string;
    capacity: string;
    location: string;
  }) => {
    try {
      const response = await fetch("/api/instruments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(instrumentData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to add instrument.");
        return;
      }

      setInstruments((previous) => [
        ...previous,
        data.instrument,
      ]);

      setShowAdd(false);

    } catch (error) {
      console.error("Add instrument error:", error);
      alert("Something went wrong while adding the instrument.");
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="fixed inset-0 -z-0 overflow-hidden">

        <div className="absolute left-[-200px] top-[150px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />

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


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:px-10">

        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <div className="text-xs font-semibold tracking-[0.2em] text-blue-400">
              ASSET MANAGEMENT
            </div>

            <h1 className="mt-2 text-4xl font-bold">
              Registered Instruments
            </h1>

            <p className="mt-3 text-slate-500">
              Manage all weighing and measuring instruments registered to
              your business.
            </p>

          </div>


          <button
            onClick={() => setShowAdd(true)}
            className="rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
          >
            + Add Instrument
          </button>

        </div>


        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-16 text-center">

            <div className="text-sm text-slate-500">
              Loading instruments...
            </div>

          </div>
        )}


        {/* =====================================================
            INSTRUMENT LIST
        ===================================================== */}

        {!loading && instruments.length > 0 && (

          <div className="grid gap-5">

            {instruments.map((instrument) => (

              <InstrumentCard
                key={instrument.id}
                instrument={instrument}
              />

            ))}

          </div>

        )}


        {/* =====================================================
            EMPTY STATE
        ===================================================== */}

        {!loading && instruments.length === 0 && (

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-16 text-center">

            <div className="text-4xl">
              ⚖
            </div>

            <h2 className="mt-4 text-xl font-semibold">
              No instruments registered
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Add your first weighing or measuring instrument.
            </p>

          </div>

        )}

      </section>


      {/* =====================================================
          ADD INSTRUMENT MODAL
      ===================================================== */}

      {showAdd && (

        <AddInstrumentModal
          onClose={() => setShowAdd(false)}
          onAdd={handleAdd}
        />

      )}

    </main>
  );
}


/* =========================================================
   INSTRUMENT CARD
========================================================= */

function InstrumentCard({
  instrument,
}: {
  instrument: Instrument;
}) {

  return (

    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition hover:border-blue-400/20">

      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

        {/* INSTRUMENT */}

        <div className="flex gap-5">

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-blue-400/10 bg-blue-400/[0.06] text-2xl">
            ⚖
          </div>

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <h2 className="text-lg font-semibold">
                {instrument.name}
              </h2>

              <span
                className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                  instrument.status === "Verified"
                    ? "bg-emerald-400/10 text-emerald-300"
                    : instrument.status === "Pending"
                      ? "bg-amber-400/10 text-amber-300"
                      : "bg-blue-400/10 text-blue-300"
                }`}
              >
                {instrument.status.toUpperCase()}
              </span>

            </div>

            <div className="mt-2 text-sm text-slate-500">
              {instrument.type}
            </div>

            <div className="mt-3 flex flex-wrap gap-5 text-xs text-slate-600">

              <span>
                ID: {instrument.id}
              </span>

              <span>
                Model: {instrument.model}
              </span>

              <span>
                Serial: {instrument.serialNumber}
              </span>

              <span>
                Capacity: {instrument.capacity}
              </span>

            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

          <div className="grid grid-cols-2 gap-6 text-right">

            <div>

              <div className="text-[10px] uppercase tracking-wider text-slate-600">
                Location
              </div>

              <div className="mt-1 text-sm text-slate-300">
                {instrument.location}
              </div>

            </div>


            <div>

              <div className="text-[10px] uppercase tracking-wider text-slate-600">
                Valid Until
              </div>

              <div className="mt-1 text-sm text-slate-300">
                {instrument.validUntil || "Not verified"}
              </div>

            </div>

          </div>


          <Link
            href={`/business/apply?instrument=${encodeURIComponent(
              instrument.id
            )}`}
            className="rounded-xl bg-blue-600 px-5 py-3 text-center text-xs font-semibold transition hover:bg-blue-500"
          >
            Apply →
          </Link>

        </div>

      </div>

    </div>

  );
}


/* =========================================================
   ADD INSTRUMENT MODAL
========================================================= */

function AddInstrumentModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (instrument: {
    name: string;
    type: string;
    manufacturer: string;
    model: string;
    serialNumber: string;
    capacity: string;
    location: string;
  }) => void;
}) {

  const [name, setName] = useState("");
  const [type, setType] = useState("Weighing Instrument");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");

  const submit = () => {

    if (
      !name.trim() ||
      !manufacturer.trim() ||
      !model.trim() ||
      !serialNumber.trim() ||
      !capacity.trim() ||
      !location.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    onAdd({
      name: name.trim(),
      type,
      manufacturer: manufacturer.trim(),
      model: model.trim(),
      serialNumber: serialNumber.trim(),
      capacity: capacity.trim(),
      location: location.trim(),
    });
  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-5 backdrop-blur-md">

      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#07101f] p-6 shadow-2xl md:p-8">

        {/* HEADER */}

        <div className="flex justify-between">

          <div>

            <div className="text-xs font-semibold tracking-[0.2em] text-blue-400">
              NEW ASSET
            </div>

            <h2 className="mt-2 text-2xl font-bold">
              Add Instrument
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Register a new weighing or measuring instrument.
            </p>

          </div>


          <button
            onClick={onClose}
            className="h-10 rounded-xl border border-white/10 px-3 text-slate-400 hover:text-white"
          >
            ✕
          </button>

        </div>


        {/* FORM */}

        <div className="mt-7 grid gap-5 md:grid-cols-2">

          <Input
            label="Instrument Name"
            value={name}
            onChange={setName}
            placeholder="e.g. Digital Weighing Scale"
          />


          <div>

            <label className="mb-2 block text-xs text-slate-400">
              Instrument Type
            </label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="input"
            >

              <option>
                Weighing Instrument
              </option>

              <option>
                Measuring Instrument
              </option>

              <option>
                Electronic Scale
              </option>

              <option>
                Platform Scale
              </option>

            </select>

          </div>


          <Input
            label="Manufacturer"
            value={manufacturer}
            onChange={setManufacturer}
            placeholder="Manufacturer"
          />


          <Input
            label="Model Number"
            value={model}
            onChange={setModel}
            placeholder="Model"
          />


          <Input
            label="Serial Number"
            value={serialNumber}
            onChange={setSerialNumber}
            placeholder="Serial number"
          />


          <Input
            label="Capacity"
            value={capacity}
            onChange={setCapacity}
            placeholder="e.g. 500 kg"
          />


          <div className="md:col-span-2">

            <Input
              label="Location"
              value={location}
              onChange={setLocation}
              placeholder="Inspection location"
            />

          </div>

        </div>


        {/* BUTTONS */}

        <div className="mt-7 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-6 py-3 text-sm text-slate-400 hover:text-white"
          >
            Cancel
          </button>


          <button
            onClick={submit}
            className="rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold hover:bg-blue-500"
          >
            Add Instrument →
          </button>

        </div>

      </div>

    </div>

  );
}


/* =========================================================
   INPUT COMPONENT
========================================================= */

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {

  return (

    <div>

      <label className="mb-2 block text-xs text-slate-400">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input"
      />

    </div>

  );
}