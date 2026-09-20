import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // ================================
  // BUSINESS
  // ================================

  const business = await prisma.business.upsert({
    where: {
      registrationNo: "LM-BUS-001",
    },
    update: {},
    create: {
      id: "BUS-001",
      businessName: "JK Enterprises",
      registrationNo: "LM-BUS-001",
      ownerName: "Arun Kumar",
      email: "business@legalmetrology.demo",
      phone: "9876543210",
      address: "Anna Salai",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600002",
    },
  });

  await prisma.user.upsert({
    where: {
      email: "business@legalmetrology.demo",
    },
    update: {
      password: "business123",
      role: "business",
      businessId: business.id,
    },
    create: {
      id: "USR-BUS-001",
      name: "Arun Kumar",
      email: "business@legalmetrology.demo",
      password: "business123",
      role: "business",
      businessId: business.id,
    },
  });

  // ================================
  // OFFICER
  // ================================

  await prisma.user.upsert({
    where: {
      email: "officer@legalmetrology.demo",
    },
    update: {
      password: "officer123",
      role: "officer",
      businessId: null,
    },
    create: {
      id: "USR-OFF-001",
      name: "LMO Officer",
      email: "officer@legalmetrology.demo",
      password: "officer123",
      role: "officer",
      businessId: null,
    },
  });

  // ================================
  // ADMINISTRATOR
  // ================================

  await prisma.user.upsert({
    where: {
      email: "admin@legalmetrology.demo",
    },
    update: {
      password: "admin123",
      role: "admin",
      businessId: null,
    },
    create: {
      id: "USR-ADM-001",
      name: "System Administrator",
      email: "admin@legalmetrology.demo",
      password: "admin123",
      role: "admin",
      businessId: null,
    },
  });

  console.log("");
  console.log("==========================================");
  console.log("LEGAL METROLOGY DEMO USERS CREATED");
  console.log("==========================================");
  console.log("");
  console.log("BUSINESS");
  console.log("Email:    business@legalmetrology.demo");
  console.log("Password: business123");
  console.log("");
  console.log("OFFICER");
  console.log("Email:    officer@legalmetrology.demo");
  console.log("Password: officer123");
  console.log("");
  console.log("ADMIN");
  console.log("Email:    admin@legalmetrology.demo");
  console.log("Password: admin123");
  console.log("");
  console.log("==========================================");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });