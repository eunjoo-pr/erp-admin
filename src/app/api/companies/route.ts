import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(companies);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const customers = await request.json();

    for (const customer of customers) {
      await prisma.company.create({
       data: {
  corporationType: customer.corporationType,
  companyName: customer.companyName,
  ceoName: customer.ceoName,
  businessNumber: customer.businessNumber,
  homepage: customer.siteUrl,
}
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}