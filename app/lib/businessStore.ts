export type Instrument = {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  capacity: string;
  location: string;
  lastVerified: string;
  validUntil: string;
  status: "Verified" | "Expiring Soon" | "Pending";
};

export type Application = {
  id: string;
  instrumentId: string;
  instrumentName: string;
  type: "Original Verification" | "Re-verification";
  location: string;
  submitted: string;
  status: "Pending" | "Under Review" | "Verified" | "Rejected";
};

export type Certificate = {
  id: string;
  certificateNumber: string;
  instrumentName: string;
  instrumentId: string;
  issuedDate: string;
  validUntil: string;
  status: "Valid" | "Expired";
};

const DEFAULT_INSTRUMENTS: Instrument[] = [
  {
    id: "LM-00124",
    name: "Digital Weighing Scale",
    type: "Electronic Weighing Instrument",
    manufacturer: "Apex Instruments",
    model: "APX-500",
    serialNumber: "APX500-2026-0194",
    capacity: "500 kg",
    location: "Chennai Branch",
    lastVerified: "27 Aug 2026",
    validUntil: "27 Aug 2027",
    status: "Verified",
  },
  {
    id: "LM-00118",
    name: "Platform Weighing Machine",
    type: "Industrial Weighing Instrument",
    manufacturer: "Precision Tech",
    model: "PT-1000",
    serialNumber: "PT1000-2026-0081",
    capacity: "1000 kg",
    location: "Warehouse A",
    lastVerified: "14 Jul 2026",
    validUntil: "14 Jul 2027",
    status: "Verified",
  },
  {
    id: "LM-00131",
    name: "Retail Counter Scale",
    type: "Commercial Weighing Instrument",
    manufacturer: "WeighMaster",
    model: "WM-30",
    serialNumber: "WM30-2025-0441",
    capacity: "30 kg",
    location: "Main Store",
    lastVerified: "02 Sep 2025",
    validUntil: "02 Sep 2026",
    status: "Expiring Soon",
  },
];

const DEFAULT_APPLICATIONS: Application[] = [
  {
    id: "APP-2026-0142",
    instrumentId: "LM-00124",
    instrumentName: "Digital Weighing Scale",
    type: "Original Verification",
    location: "Chennai Branch",
    submitted: "27 Aug 2026",
    status: "Verified",
  },
  {
    id: "APP-2026-0138",
    instrumentId: "LM-00118",
    instrumentName: "Platform Weighing Machine",
    type: "Re-verification",
    location: "Warehouse A",
    submitted: "26 Aug 2026",
    status: "Under Review",
  },
];

const DEFAULT_CERTIFICATES: Certificate[] = [
  {
    id: "CERT-001",
    certificateNumber: "LM/CHN/2026/008421",
    instrumentName: "Digital Weighing Scale",
    instrumentId: "LM-00124",
    issuedDate: "27 Aug 2026",
    validUntil: "27 Aug 2027",
    status: "Valid",
  },
];

function readData<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const saved = localStorage.getItem(key);

  if (!saved) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }

  try {
    return JSON.parse(saved);
  } catch {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
}

function saveData<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}


/* =========================================================
   INSTRUMENTS
========================================================= */

export function getInstruments(): Instrument[] {
  return readData("lm_instruments", DEFAULT_INSTRUMENTS);
}

export function saveInstruments(instruments: Instrument[]) {
  saveData("lm_instruments", instruments);
}

export function addInstrument(
  instrument: Omit<
    Instrument,
    "id" | "lastVerified" | "validUntil" | "status"
  >
) {
  const instruments = getInstruments();

  const newInstrument: Instrument = {
    ...instrument,
    id: `LM-${String(Date.now()).slice(-5)}`,
    lastVerified: "Not verified yet",
    validUntil: "Pending verification",
    status: "Pending",
  };

  saveInstruments([...instruments, newInstrument]);

  return newInstrument;
}


/* =========================================================
   APPLICATIONS
========================================================= */

export function getApplications(): Application[] {
  return readData("lm_applications", DEFAULT_APPLICATIONS);
}

export function saveApplications(applications: Application[]) {
  saveData("lm_applications", applications);
}

export function addApplication(
  application: Omit<Application, "id" | "submitted" | "status">
) {
  const applications = getApplications();

  const newApplication: Application = {
    ...application,
    id: `APP-2026-${String(Date.now()).slice(-4)}`,
    submitted: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    status: "Pending",
  };

  saveApplications([...applications, newApplication]);

  return newApplication;
}


/* =========================================================
   CERTIFICATES
========================================================= */

export function getCertificates(): Certificate[] {
  return readData("lm_certificates", DEFAULT_CERTIFICATES);
}

export function saveCertificates(certificates: Certificate[]) {
  saveData("lm_certificates", certificates);
}


/* =========================================================
   FIND CERTIFICATE
   Used by the public QR verification page
========================================================= */

export function getCertificateByNumber(
  certificateNumber: string
): Certificate | null {
  const certificates = getCertificates();

  const decodedNumber = decodeURIComponent(certificateNumber);

  const certificate = certificates.find(
    (item) => item.certificateNumber === decodedNumber
  );

  return certificate ?? null;
}