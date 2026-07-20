-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "corporation_type" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "ceo_name" TEXT NOT NULL,
    "business_number" TEXT NOT NULL,
    "corporation_number" TEXT,
    "founding_date" TIMESTAMP(3),
    "phone" TEXT,
    "email" TEXT,
    "homepage" TEXT,
    "site_url" TEXT,
    "status" TEXT DEFAULT '사용중',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);
