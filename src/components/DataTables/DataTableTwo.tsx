"use client";

import { ChevronLeft, ChevronRight, SearchIcon } from "@/assets/icons";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { PointerUp } from "./icons";

type CompanyRow = {
  고객사명: string;
  법인구분: string;
  대표자: string;
  사이트주소: string;
  사업자등록번호: string;
  상태: string;
  관리: string;
};



// table header
const columns: ColumnDef<CompanyRow>[] = [
 {
  header: "고객사명",
  accessorKey: "고객사명",
},
{
  header: "법인구분",
  accessorKey: "법인구분",
},
{
  header: "대표자",
  accessorKey: "대표자",
},
{
  header: "사이트 주소",
  accessorKey: "사이트주소",
},
{
  header: "사업자등록번호",
  accessorKey: "사업자등록번호",
},
{
  header: "상태",
  accessorKey: "상태",
},
{
  header: "관리",
  accessorKey: "관리",
},
];

import { Company } from "../../../prisma/generated/prisma/client";
type TableProps = {
  companies?: Company[];
};
 export default function DataTableTwo({
  companies = [],
}: TableProps) {

   console.log("companies", companies);

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const data: CompanyRow[] = companies.map((company) => ({
  고객사명: company.companyName,
  법인구분: company.corporationType,
  대표자: company.ceoName,
  사이트주소: company.homepage ?? "",
  사업자등록번호: company.businessNumber,
  상태: company.status ?? "",
  관리: "변경",
}));

console.log(companies);
console.log(data);

const table = useReactTable({
  data,

    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <section className="data-table-common data-table-two rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex justify-between px-7.5 py-4.5">
        <div className="relative z-20 w-full max-w-103.5">
          <input
            type="text"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full rounded-[7px] border border-stroke bg-[#F6F8FB] px-5 py-2.5 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
            placeholder="고객사 검색"
          />

          <button className="absolute top-0 right-0 flex h-11.5 w-11.5 items-center justify-center rounded-r-md">
            <SearchIcon />
          </button>
        </div>

        <div className="flex items-center font-medium">
          <p className="hidden pl-2 text-dark sm:block dark:text-current">
            목록수:
          </p>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="bg-transparent pl-2.5"
          >
            {[5, 10, 20, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 overflow-x-auto">
        <table className="datatable-table border-collapse! px-4 md:px-8">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </span>

                      <div className="ml-2 inline-flex flex-col space-y-0.5">
                        <PointerUp />
                        <PointerUp className="rotate-180" />
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center">
                  No data found
                </td>
              </tr>
            )}

            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="truncate">
                    {cell.column.id === "관리" ? (
  <button className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700">
    변경
  </button>
) : (
  flexRender(cell.column.columnDef.cell, cell.getContext())
)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-6 py-5">
        <p className="font-medium">
          Showing {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()} pages
        </p>
        <div className="flex">
          <button
            className="flex cursor-pointer items-center justify-center rounded-[3px] p-1.75 hover:bg-primary hover:text-white disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft width={18} height={18} />
          </button>

          {Array.from(
            { length: table.getPageCount() },
            (_, index) => index,
          ).map((pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => table.setPageIndex(pageIndex)}
              className={`${
                table.getState().pagination.pageIndex === pageIndex &&
                "bg-primary text-white"
              } mx-1 flex cursor-pointer items-center justify-center rounded-[3px] p-1.5 px-3.75 hover:bg-primary hover:text-white`}
            >
              {pageIndex + 1}
            </button>
          ))}

          <button
            className="flex cursor-pointer items-center justify-center rounded-[3px] p-1.75 hover:bg-primary hover:text-white disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight width={18} height={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
