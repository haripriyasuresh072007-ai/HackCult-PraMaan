# ⚖️ Pramaan

## Online Verification and Digital Certification System for Weighing and Measuring Instruments

**Smart India Hackathon 2026 | Problem Statement SIH26036 | Team HackCult | R.M.D. Engineering College**

Pramaan is a web-based prototype that digitises the verification journey for weighing and measuring instruments used under India's Legal Metrology framework.

It covers instrument registration, online applications for verification or re-verification, officer inspection against a digital checklist, issue of a QR-enabled digital certificate, and public verification of that certificate by scanning its QR code. Businesses, Legal Metrology Officers and Administrators each use their own role-based portal, all working on one central record.

Pramaan is a demonstration prototype. It is not an official government system and does not replace the statutory procedures or the judgement of the verifying officer.

---

## 🚀 Live Demo
Try the current prototype:https://legal-metrology-eight.vercel.app/

Source code: https://github.com/haripriyasuresh072007-ai/HackCult-PraMaan


## 📌 Prototype Status:40 Percent of the prototype is completed

**Status: Functional Web-Application Prototype built around the core verification workflow**

The current application covers the full flow from instrument registration to public QR verification, with a role-based dashboard.

### Completed in Current Prototype

- Role-based portals for Business, Officer and Administrator
- Instrument registration (type, manufacturer, model, serial number, capacity)
- Online application for verification and re-verification, with inspection date and location
- Application queue and officer assignment
- Digital inspection checklist and verification against standards
- Unique certificate number with verification and validity dates
- QR-enabled digital certificates
- Public QR verification (no login, read-only)
- Dashboards for instruments, applications, processing status and certificates, with system-health indicators
- Cloud deployment on Vercel with a Prisma-managed PostgreSQL database

### Planned Future Extensions

- Production-grade authentication, session security and audit logs
- Government Approved Test Centre (GATC) role and allocation of verification work
- Expiry alerts and reminders, with due dates on dashboards
- Photograph and supporting-document upload
- Certificate and report export and printing
- Full record search (by certificate number, serial number, business and date)
- Detailed measured-observation records
- Mobile workflow for field officers, including poor-connectivity support
- Pendency and enforcement dashboards
- Data migration tools for existing paper and local records
- Integration with State Legal Metrology portals and the national eMaap portal, subject to authority access
- Phased pilot, user training and field validation

The current deployment is the integrated prototype being demonstrated. The items above are planned future work and are not part of the current version.

---

## 🎯 Project Overview

Every business that uses a weighing or measuring instrument in trade must keep it verified. Verification involves several parties: businesses, Legal Metrology Officers, Government Approved Test Centres, administrators and, at the point of sale, the public.

Where this runs on paper or in isolated local systems, applications, inspections and certificates are slow to process and hard to track.

Pramaan connects the whole workflow in one system, so each role sees what it needs and every action updates a single central record.

The project was developed by Team HackCult from R.M.D. Engineering College for Smart India Hackathon 2026, Problem Statement **SIH26036**: *Software Development of an Online Verification System for Weighing and Measuring Instruments* (Ministry of Consumer Affairs, Food & Public Distribution, Department of Consumer Affairs).

Pramaan is designed to support Legal Metrology authorities. It aligns with UN Sustainable Development Goal 16 (Peace, Justice and Strong Institutions).

---

## 🧠 Problem Statement

Under the Legal Metrology Act, 2009 and the Legal Metrology (General) Rules, 2011, weighing and measuring instruments used in trade must be periodically verified and stamped before use.

Where verification runs on paper or in isolated local systems, four challenges shape the design of Pramaan:

- **Manual, paper-based processes.** Applications, inspections and certificates move on paper, which is slow.
- **Hard-to-track records.** Application status and inspection history are difficult to follow.
- **Validity tracking.** Re-verification is due at prescribed intervals, but there is no central view of valid certificates.
- **No simple public check.** A buyer has no easy way to confirm that a certificate is genuine.

The 2025 amendments to the Government Approved Test Centre Rules widened the instrument categories that test centres can verify, so shared digital records matter more.

A unified online verification and digital certification system is needed to improve transparency, efficiency and ease of compliance.

---

## ✨ Key Features

### 1. 🔐 Role-Based Portals

Registration, login and separate portals for Business, Officer and Administrator. Each role sees only the screens and actions meant for it.

### 2. 🧰 Instrument Registry

Business owners register each weighing or measuring instrument with its type, manufacturer, model, serial number and capacity. Each instrument keeps a traceable digital history.

### 3. 📝 Online Applications

Business owners apply online for verification or re-verification, confirm the instrument type, choose the inspection date and location, and track the status of each application.

Status labels include **Pending**, **Under Review** and **Verified**.

### 4. 📋 Application Queue and Officer Assignment

Submitted applications enter an officer's queue, and an officer is assigned for inspection.

### 5. ✅ Digital Inspection Checklist

The officer carries out the inspection against a digital checklist, cross-checks the instrument against the applicable standards, and validates its details.

### 6. 🏷️ QR-Enabled Digital Certificates

Once an instrument is verified, Pramaan issues a digital certificate with:

- A unique certificate number
- Verification date and validity date
- A QR code

### 7. 📱 Public QR Verification

Anyone can scan the QR code on a certificate to check its authenticity. The scan opens a public verification page that checks the certificate against the central record and shows its details, including validity dates.

- No login is needed
- The page is read-only
- Checking against the source record, not the printed copy, makes a forged or altered paper certificate easy to catch

### 8. 📊 Dashboards and Monitoring

The Business portal dashboard shows summary cards for registered instruments, applications, applications under processing and certificates issued, along with recent applications and a system-health panel (application service, officer workflow, certificate service and QR verification).

Administrators can monitor applications and certificates across the system and apply manual overrides where needed.

> **Note:** The figures shown in the prototype dashboard are prototype data and do not represent real instruments or certificates.

---

## 🔄 Verification Workflow

| Step | Action |
|---:|---|
| 1 | Register users: business owners, officers and administrators, with role-based access |
| 2 | Register the instrument: type, manufacturer and model, serial number and capacity |
| 3 | Apply online: confirm the instrument type, choose the inspection date and location, and submit the request |
| 4 | The application enters the queue and an officer is assigned for inspection |
| 5 | The officer carries out the inspection using the digital inspection checklist |
| 6 | The officer verifies the instrument against standards and validates its details |
| 7 | Pramaan issues the certificate: unique number, validity dates and QR code |
| 8 | Anyone scans the QR code to check the certificate's authenticity publicly |
| 9 | Dashboards track status and validity, and the record supports the next re-verification cycle |

Simplified view:

```text
1 Registration  →  2 Application  →  3 Inspection
      ↑                                    ↓
 (recurring                          4 Verification
re-verification)                           ↓
6 QR Verification  ←  5 Certificate  ←─────┘

 Centralised records · Role-based dashboards · Feedback log
```

---

## 🏗️ Current System Architecture

The current implementation is an integrated Next.js application. The web interface, application logic, data access and QR verification run within one application, deployed on Vercel.

```text
   ┌──────────┐ ┌──────────┐ ┌───────────────┐ ┌──────────┐
   │ Business │ │ Officer  │ │ Administrator │ │  Public  │
   │  owner   │ │  Legal   │ │   authority   │ │ QR scan  │
   │ / trader │ │ Metrology│ │               │ │          │
   └────┬─────┘ └────┬─────┘ └───────┬───────┘ └────┬─────┘
        │            │               │              │
        └────────────┴───────┬───────┴──────────────┘
                             ▼
             ┌───────────────────────────────┐
             │   Next.js + React Web App     │
             │ TypeScript · Tailwind CSS     │
             │ responsive, role-based portals│
             └───────────────┬───────────────┘
                             │
   ┌───────────┬─────────────┼─────────────┬───────────────┐
   ▼           ▼             ▼             ▼               ▼
┌─────────┐ ┌────────────┐ ┌───────────┐ ┌─────────────┐ ┌────────────┐
│Instrument│ │Applications│ │Inspection │ │Certificates │ │Dashboards  │
│ Registry │ │& Assignment│ │ Checklist │ │   & QR      │ │& Monitoring│
└────┬─────┘ └─────┬──────┘ └─────┬─────┘ └──────┬──────┘ └─────┬──────┘
     └─────────────┴──────────────┼──────────────┴──────────────┘
                                  ▼
                 ┌────────────────────────────────┐
                 │  Prisma ORM → PostgreSQL       │
                 │ instruments · applications ·   │
                 │ inspections · certificates     │
                 └────────────────────────────────┘

                   Hosted on Vercel (cloud deployment)
```

### Design Principle: One Central Record

All portals read and write the same central records through a single data layer (Prisma). Because every action updates one record, dashboards, certificates and verification results stay consistent with each other.

---

## 👥 Roles and Access

| Role | What the role can do |
|---|---|
| Business owner | Register instruments, apply for verification or re-verification, track application status and view certificates |
| Legal Metrology Officer | Work the assigned application queue, carry out the inspection with the digital checklist, and verify instrument details and accuracy |
| Administrator | Monitor applications and certificates across the system through the admin dashboard, and apply manual overrides where needed |
| Public verifier | Scan a certificate's QR code to check its authenticity without logging in |

---

## 🗂️ Core Records

Four kinds of record connect the workflow. Each one links back to the instrument, which gives every instrument a traceable history.

| Record | Key details |
|---|---|
| Instrument | Instrument type, manufacturer and model, serial number, capacity |
| Application | Instrument, request type (verification or re-verification), inspection date and location, and status (Pending, Under Review or Verified) |
| Inspection | Assigned officer and the results of the digital inspection checklist |
| Certificate | Unique certificate number, verification date, validity date and QR code |

---

## 🧩 Modules

| Module | What it does | Used by |
|---|---|---|
| Access and roles | Registration, login and separate portals with role-based access | All users |
| Instrument registry | Stores instrument type, manufacturer and model, serial number and capacity | Business, Administrator |
| Application management | Verification and re-verification requests with inspection date and location, plus status tracking | Business, Officer |
| Queue and assignment | Application queue and assignment of an officer for inspection | Officer, Administrator |
| Inspection and verification | Digital inspection checklist, cross-check against standards and validation of instrument details | Officer |
| Certificate service | Unique certificate number, verification and validity dates, and a QR-enabled certificate | Officer, Business |
| QR verification | Public scan-and-check of a certificate's authenticity | Public, Business |
| Dashboards and monitoring | Central view of instruments, applications, processing status, certificates and system health | Business, Administrator |

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | Full-stack web application |
| React | Interactive user interfaces |
| TypeScript | Type-safe development |
| Prisma | Database ORM and management |
| PostgreSQL | Application database |
| Tailwind CSS | Responsive UI styling |
| QR code | Digital certificate verification |
| Vercel | Cloud deployment and hosting |

The stack uses open-source, widely supported tools, which keeps licensing costs low and makes the project easy for other developers to maintain.

---

## 📑 Problem Statement Coverage (SIH26036)

**Core** means part of the core solution, **Partial** means covered in part, and **Planned** means not in the current version.

| Requirement | Status |
|---|---|
| Online registration and profile management of stakeholders | Partial (test centres not yet a separate role) |
| Applications for verification and re-verification | Core |
| Scheduling and allocation of verification work | Partial (no test-centre allocation yet) |
| Digital recording of inspection observations and results | Core |
| QR-enabled digital verification certificates | Core |
| Digital repository of certificates and instrument records | Core |
| Tracking of validity and re-verification due dates | Partial (validity dates stored; due-date views planned) |
| Alerts and reminders for expiring validity | Planned |
| Dashboards for status, pendency and enforcement | Partial (pendency and enforcement views planned) |
| Search and retrieval of records and certificates | Partial (public QR verification; full search planned) |
| Role-based secure login | Partial (stronger authentication and audit logs planned) |
| Upload of photographs and supporting documents | Planned |
| Export and printing of certificates and reports | Planned |
| Mobile support for field verification | Partial (responsive web interface; field workflow planned) |
| Technical documentation: architecture, security, deployment | Core |

---

## 🔒 Security Framework

- Role-based access control separates the Business, Officer and Administrator portals
- Authentication protects every portal; stronger authentication is required before production use
- Certificates are checked against the central record, and the public QR page is read-only
- The administrator dashboard allows monitoring and manual overrides
- Audit logs of officer and administrator actions are planned

---

## 🎬 Demo Walkthrough

1. Sign in as a **Business owner**, open the dashboard and register an instrument
2. Submit an application for verification or re-verification with an inspection date and location
3. Sign in as an **Officer**, open the application queue and complete the digital inspection checklist
4. Verify the instrument and issue the certificate with its unique number, validity dates and QR code
5. Scan the QR code to show public verification of the certificate
6. Show the **Administrator** dashboard for monitoring

---

## 🧑‍💻 Getting Started

<!-- Adjust these steps to match your repository (package manager, env variable names, seed scripts). -->

### Prerequisites

- Node.js (LTS recommended)
- A PostgreSQL database (local or hosted)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and set your database connection:

```text
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
```

Add any other variables your project requires (for example authentication secrets).

### 4. Set Up the Database

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Run the Application

```bash
npm run dev
```

The application will open at `http://localhost:3000`.

---

## 🌐 Deployment

Pramaan is a Next.js application, and Vercel is the deployment target for cloud hosting, chosen for its low cost. Prisma manages the PostgreSQL database used by the application.

Rollout is planned in phases: start with selected businesses and officers, gather feedback, and expand gradually. Integration with existing State and national systems would follow the pilot, subject to access from the authorities.

> A production deployment would need stronger authentication, role-based access and audit logs.

---

## 🧭 Feasibility and Strategy

- **Technical:** Open-source stack, scalable architecture, designed to integrate with existing systems
- **Economic:** Minimal licensing costs, lightweight cloud infrastructure, less paperwork and manual processing
- **Implementation:** Phased deployment, user training with simple dashboards, and platform security hardening

| Challenge | Planned response |
|---|---|
| Data migration | Start with selected users and expand gradually |
| User adoption | Simple dashboards, guidance and user training |
| Security | Add authentication, role-based access and audit logs |

---

## 🔮 Future Enhancements

Pramaan can be extended through:

- Production-grade security: stronger authentication, session security and audit logs
- Test centre (GATC) role and allocation of verification work
- Expiry alerts and reminders
- Photograph and document attachments
- Certificate and report export and printing
- Search by certificate number, instrument serial number, business and date
- Detailed measured-observation records
- Field and mobile workflow with poor-connectivity support
- Pendency and enforcement dashboards
- Data migration tools for paper and local records
- Integration with State Legal Metrology portals and the national eMaap portal
- Phased pilot with selected users and training
- Field validation with Legal Metrology departments, test centres and businesses

---

## ⚠️ Limitations and Disclaimer

Pramaan is a **software prototype developed for demonstration under SIH26036**.

It is not an official government system and does not replace verification by authorised Legal Metrology Officers or Government Approved Test Centres.

In particular:

- Stronger authentication is required before any production use
- Integration with State Legal Metrology portals and the national eMaap portal is a design goal and is **not part of the current version**
- Verification standards, validity periods and fees come from the Legal Metrology rules and vary by instrument category; the platform must be aligned with the current rules and validated with the authorities before operational use
- The legal standing of digital certificates depends on the rules and notifications of the competent authority
- Test centres, expiry alerts, document upload, certificate and report export, and a dedicated field workflow are **not yet included**
- The figures shown in the prototype dashboard are prototype data and do not represent real instruments or certificates
- The system has **not yet been tested in the field** with officers, test centres or businesses
- Verification results must be confirmed by an authorised Legal Metrology Officer before a certificate is relied on

---

## 👥 Team

**Team HackCult** — R.M.D. Engineering College, Department of Computer Science and Engineering, Year II

- Haripriya S [Team Lead]
- Jesika M V
- Kodavala Dhurgasree
- Rupendra M
- Pranav Mani S
- Sanjay Raaj D

**Mentor:** Rajeshwari P

---

## 📚 References

- Department of Consumer Affairs, Government of India, Legal Metrology Act, 2009
- Department of Consumer Affairs, Government of India, Legal Metrology (General) Rules, 2011
- Legal Metrology (Government Approved Test Centre) Rules, 2013, and 2025 amendments
- Press Information Bureau, National Legal Metrology Portal (eMaap), December 2024
- OIML, "Digital Transparency in Legal Metrology", OIML Bulletin, 2025
- Smart India Hackathon 2026, Problem Statement SIH26036, Department of Consumer Affairs

---

## 📄 License and Notes

© 2026 Pramaan — Software prototype for educational and demonstration purposes.

This project demonstrates how the Legal Metrology verification journey can be delivered as one connected digital workflow, from instrument registration to public QR verification, with production hardening, stakeholder expansion and integration left as future work.
