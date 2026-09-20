"use client";

/* =========================================================
   TYPES
========================================================= */

export type Instrument = {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  location: string;

  // Fields used by the business UI
  type: string;
  capacity: string;
  validUntil: string;

  status: "Active" | "Pending" | "Expired" | "Verified" | "Expiring Soon";
  lastVerified: string;
  nextVerification: string;
};

export type Application = {
  id: string;
  business: string;

  // Keep both names because different pages use different names
  instrument: string;
  instrumentName: string;
  instrumentId?: string;

  type: string;
  location: string;
  submitted: string;
  priority: "Normal" | "High";

  status: "Pending" | "Under Review" | "Verified" | "Rejected";
};

export type Certificate = {
  id: string;
  applicationId: string;

  business: string;

  // Names used by different pages
  instrument: string;
  instrumentName: string;
  instrumentId?: string;

  certificateNumber: string;

  issuedDate: string;
  validUntil: string;
  status: "Valid" | "Expired";
  qrCode: string;
};


/* =========================================================
   DEFAULT DATA
========================================================= */

const DEFAULT_INSTRUMENTS: Instrument[] = [
  {
    id: "INS-001",
    name: "Digital Weighing Scale",
    manufacturer: "Essae",
    model: "DS-30",
    serialNumber: "ES-DS30-2026-001",
    location: "Chennai Branch",

    type: "Electronic Weighing Instrument",
    capacity: "30 kg",
    validUntil: "15 Aug 2027",

    status: "Active",
    lastVerified: "15 Aug 2026",
    nextVerification: "15 Aug 2027",
  },

  {
    id: "INS-002",
    name: "Platform Weighing Machine",
    manufacturer: "Avery",
    model: "PWI-500",
    serialNumber: "AV-PWI-2026-014",
    location: "Ambattur Warehouse",

    type: "Platform Weighing Instrument",
    capacity: "500 kg",
    validUntil: "10 Jul 2027",

    status: "Pending",
    lastVerified: "10 Jul 2026",
    nextVerification: "10 Jul 2027",
  },

  {
    id: "INS-003",
    name: "Electronic Retail Scale",
    manufacturer: "Mettler Toledo",
    model: "Retail-20",
    serialNumber: "MT-R20-2026-078",
    location: "Anna Nagar",

    type: "Electronic Retail Instrument",
    capacity: "20 kg",
    validUntil: "20 Aug 2027",

    status: "Active",
    lastVerified: "20 Aug 2026",
    nextVerification: "20 Aug 2027",
  },
];


const DEFAULT_APPLICATIONS: Application[] = [
  {
    id: "APP-2026-0151",
    business: "JK Enterprises",

    instrument: "Digital Weighing Scale",
    instrumentName: "Digital Weighing Scale",
    instrumentId: "INS-001",

    type: "Original Verification",
    location: "Chennai Branch",
    submitted: "28 Aug 2026",
    priority: "Normal",
    status: "Pending",
  },

  {
    id: "APP-2026-0148",
    business: "Sri Lakshmi Traders",

    instrument: "Platform Weighing Machine",
    instrumentName: "Platform Weighing Machine",
    instrumentId: "INS-002",

    type: "Re-verification",
    location: "Ambattur Warehouse",
    submitted: "27 Aug 2026",
    priority: "High",
    status: "Pending",
  },

  {
    id: "APP-2026-0143",
    business: "Metro Supermarket",

    instrument: "Electronic Retail Scale",
    instrumentName: "Electronic Retail Scale",
    instrumentId: "INS-003",

    type: "Re-verification",
    location: "Anna Nagar",
    submitted: "26 Aug 2026",
    priority: "Normal",
    status: "Pending",
  },
];


const DEFAULT_CERTIFICATES: Certificate[] = [
  {
    id: "CERT-001",
    applicationId: "APP-2026-0140",

    business: "ABC Traders",

    instrument: "Digital Weighing Scale",
    instrumentName: "Digital Weighing Scale",
    instrumentId: "INS-001",

    certificateNumber: "CERT-001",

    issuedDate: "20 Aug 2026",
    validUntil: "20 Aug 2027",
    status: "Valid",
    qrCode: "CERT-001",
  },
];


/* =========================================================
   LOCAL STORAGE KEYS
========================================================= */

const INSTRUMENTS_KEY = "legal-metrology-instruments";
const APPLICATIONS_KEY = "legal-metrology-applications";
const CERTIFICATES_KEY = "legal-metrology-certificates";


/* =========================================================
   STORAGE HELPERS
========================================================= */

function saveInstruments(data: Instrument[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      INSTRUMENTS_KEY,
      JSON.stringify(data)
    );
  }
}


function saveApplications(data: Application[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      APPLICATIONS_KEY,
      JSON.stringify(data)
    );
  }
}


function saveCertificates(data: Certificate[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      CERTIFICATES_KEY,
      JSON.stringify(data)
    );
  }
}


/* =========================================================
   GET INSTRUMENTS
========================================================= */

export function getInstruments(): Instrument[] {
  if (typeof window === "undefined") {
    return DEFAULT_INSTRUMENTS;
  }

  const stored = localStorage.getItem(INSTRUMENTS_KEY);

  if (!stored) {
    saveInstruments(DEFAULT_INSTRUMENTS);
    return DEFAULT_INSTRUMENTS;
  }

  try {
    const parsed = JSON.parse(stored) as Instrument[];

    return parsed.map((instrument) => ({
      ...instrument,

      type:
        instrument.type ??
        "Electronic Weighing Instrument",

      capacity:
        instrument.capacity ??
        "Not specified",

      validUntil:
        instrument.validUntil ??
        instrument.nextVerification,

    }));
  } catch {
    saveInstruments(DEFAULT_INSTRUMENTS);
    return DEFAULT_INSTRUMENTS;
  }
}


/* =========================================================
   GET APPLICATIONS
========================================================= */

export function getApplications(): Application[] {
  if (typeof window === "undefined") {
    return DEFAULT_APPLICATIONS;
  }

  const stored = localStorage.getItem(APPLICATIONS_KEY);

  if (!stored) {
    saveApplications(DEFAULT_APPLICATIONS);
    return DEFAULT_APPLICATIONS;
  }

  try {
    const parsed = JSON.parse(stored) as Application[];

    return parsed.map((application) => ({
      ...application,

      instrumentName:
        application.instrumentName ??
        application.instrument,

      instrument:
        application.instrument ??
        application.instrumentName,

      status:
        application.status === "Under Review"
          ? "Under Review"
          : application.status,
    }));
  } catch {
    saveApplications(DEFAULT_APPLICATIONS);
    return DEFAULT_APPLICATIONS;
  }
}


/* =========================================================
   GET CERTIFICATES
========================================================= */

export function getCertificates(): Certificate[] {
  if (typeof window === "undefined") {
    return DEFAULT_CERTIFICATES;
  }

  const stored = localStorage.getItem(CERTIFICATES_KEY);

  if (!stored) {
    saveCertificates(DEFAULT_CERTIFICATES);
    return DEFAULT_CERTIFICATES;
  }

  try {
    const parsed = JSON.parse(stored) as Certificate[];

    return parsed.map((certificate) => ({
      ...certificate,

      instrumentName:
        certificate.instrumentName ??
        certificate.instrument,

      instrument:
        certificate.instrument ??
        certificate.instrumentName,

      certificateNumber:
        certificate.certificateNumber ??
        certificate.id,

      instrumentId:
        certificate.instrumentId,
    }));
  } catch {
    saveCertificates(DEFAULT_CERTIFICATES);
    return DEFAULT_CERTIFICATES;
  }
}


/* =========================================================
   ADD INSTRUMENT
========================================================= */

export function addInstrument(
  instrument: Omit<Instrument, "id">
): Instrument {

  const instruments = getInstruments();

  const newInstrument: Instrument = {
    ...instrument,

    id: `INS-${String(
      instruments.length + 1
    ).padStart(3, "0")}`,
  };

  const updated = [
    ...instruments,
    newInstrument,
  ];

  saveInstruments(updated);

  return newInstrument;
}


/* =========================================================
   ADD APPLICATION
========================================================= */

type AddApplicationInput = Omit<
  Application,
  "id" | "status" | "instrumentName"
> & {
  instrumentName?: string;
};

export function addApplication(
  application: AddApplicationInput
): Application {

  const applications = getApplications();

  const newId =
    `APP-2026-${String(
      151 + applications.length
    ).padStart(4, "0")}`;

  const newApplication: Application = {
    ...application,

    instrument:
      application.instrument ??
      application.instrumentName,

    instrumentName:
      application.instrumentName ??
      application.instrument,

    id: newId,

    status: "Pending",
  };

  const updated = [
    ...applications,
    newApplication,
  ];

  saveApplications(updated);

  return newApplication;
}


/* =========================================================
   ADD CERTIFICATE
========================================================= */

export function addCertificate(
  certificate: Omit<
    Certificate,
    "id" | "certificateNumber" | "instrumentName"
  > & {
    certificateNumber?: string;
    instrumentName?: string;
  }
): Certificate {

  const certificates = getCertificates();

  const newId =
    `CERT-${String(
      certificates.length + 1
    ).padStart(3, "0")}`;

  const newCertificate: Certificate = {
    ...certificate,

    id: newId,

    certificateNumber:
      certificate.certificateNumber ??
      newId,

    instrument:
      certificate.instrument ??
      certificate.instrumentName,

    instrumentName:
      certificate.instrumentName ??
      certificate.instrument,
  };

  const updated = [
    ...certificates,
    newCertificate,
  ];

  saveCertificates(updated);

  return newCertificate;
}


/* =========================================================
   UPDATE APPLICATION
========================================================= */

export function updateApplication(
  id: string,
  updates: Partial<Application>
): Application | null {

  const applications = getApplications();

  const index = applications.findIndex(
    (application) =>
      application.id === id
  );

  if (index === -1) {
    return null;
  }

  applications[index] = {
    ...applications[index],
    ...updates,

    instrument:
      updates.instrument ??
      updates.instrumentName ??
      applications[index].instrument,

    instrumentName:
      updates.instrumentName ??
      updates.instrument ??
      applications[index].instrumentName,
  };

  saveApplications(applications);

  return applications[index];
}


/* =========================================================
   DEMO DATA
========================================================= */

export function loadDemoData() {

  if (typeof window === "undefined") {
    return;
  }

  saveInstruments(DEFAULT_INSTRUMENTS);

  saveApplications(DEFAULT_APPLICATIONS);

  saveCertificates(DEFAULT_CERTIFICATES);
}