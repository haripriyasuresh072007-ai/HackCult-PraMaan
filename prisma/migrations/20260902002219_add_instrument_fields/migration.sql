/*
  Warnings:

  - Added the required column `capacity` to the `Instrument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Instrument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validUntil` to the `Instrument` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Instrument" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "validUntil" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "lastVerified" TEXT NOT NULL,
    "nextVerification" TEXT NOT NULL
);
INSERT INTO "new_Instrument" ("id", "lastVerified", "location", "manufacturer", "model", "name", "nextVerification", "serialNumber", "status") SELECT "id", "lastVerified", "location", "manufacturer", "model", "name", "nextVerification", "serialNumber", "status" FROM "Instrument";
DROP TABLE "Instrument";
ALTER TABLE "new_Instrument" RENAME TO "Instrument";
CREATE UNIQUE INDEX "Instrument_serialNumber_key" ON "Instrument"("serialNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
