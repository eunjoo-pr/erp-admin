import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DataTableOne from "@/components/DataTables/DataTableOne";
import DataTableTwo from "@/components/DataTables/DataTableTwo";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DataTables",
  // other metadata
};

export default async function Page() {
  const companies = await prisma.company.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(companies);
  
  return (
    <>
      <Breadcrumb pageName="고객사 관리" />

      <div className="grid grid-cols-1 gap-5 md:gap-7 2xl:gap-10">
        <DataTableOne />
        <DataTableTwo companies={companies} />
      </div>
    </>
  );
}
