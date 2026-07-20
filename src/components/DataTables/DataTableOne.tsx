"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Customer = {
  companyName: string;
  corporationType: string;
  ceoName: string;
  siteUrl: string;
  businessNumber: string;
  status: string;
};

export default function DataTableOne() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [customer, setCustomer] = useState<Customer>({
    companyName: "",
    corporationType: "비영리",
    ceoName: "",
    siteUrl: "",
    businessNumber: "",
    status: "사용중",
  });

  function updateField(
    field: keyof Customer,
    value: string,
  ) {
    setCustomer((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function saveCustomer() {
    const response = await fetch("/api/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([customer]),
    });

    if (!response.ok) {
      alert("저장 실패");
      return;
    }

    alert("저장되었습니다.");

    setOpen(false);

    setCustomer({
      companyName: "",
      corporationType: "비영리",
      ceoName: "",
      siteUrl: "",
      businessNumber: "",
      status: "사용중",
    });

    router.refresh();
  }

  return (
    <>
      <section className="rounded-[10px] bg-white p-6 shadow-1">

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-primary px-5 py-3 font-medium text-white"
        >
          + 고객사 추가
        </button>

      </section>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

          <div className="w-full max-w-3xl rounded-xl bg-white p-8">

            <h2 className="mb-6 text-2xl font-bold">
              고객사 등록
            </h2>

            <div className="grid grid-cols-2 gap-5">

              <div>
                <label>고객사명</label>

                <input
                  className="mt-2 w-full rounded border p-3"
                  value={customer.companyName}
                  onChange={(e) =>
                    updateField("companyName", e.target.value)
                  }
                />
              </div>

              <div>
                <label>법인구분</label>

                <select
                  className="mt-2 w-full rounded border p-3"
                  value={customer.corporationType}
                  onChange={(e) =>
                    updateField("corporationType", e.target.value)
                  }
                >
                  <option>비영리</option>
                  <option>영리</option>
                </select>
              </div>

              <div>
                <label>대표자</label>

                <input
                  className="mt-2 w-full rounded border p-3"
                  value={customer.ceoName}
                  onChange={(e) =>
                    updateField("ceoName", e.target.value)
                  }
                />
              </div>

              <div>
                <label>사이트주소</label>

                <input
                  className="mt-2 w-full rounded border p-3"
                  value={customer.siteUrl}
                  onChange={(e) =>
                    updateField("siteUrl", e.target.value)
                  }
                />
              </div>

              <div>
                <label>사업자등록번호</label>

                <input
                  className="mt-2 w-full rounded border p-3"
                  value={customer.businessNumber}
                  onChange={(e) =>
                    updateField("businessNumber", e.target.value)
                  }
                />
              </div>

              <div>
                <label>상태</label>

                <select
                  className="mt-2 w-full rounded border p-3"
                  value={customer.status}
                  onChange={(e) =>
                    updateField("status", e.target.value)
                  }
                >
                  <option>사용중</option>
                  <option>중지</option>
                  <option>준비중</option>
                </select>
              </div>

            </div>

            <div className="mt-8 flex justify-end gap-3">

              <button
                onClick={() => setOpen(false)}
                className="rounded border px-6 py-3"
              >
                취소
              </button>

              <button
                onClick={saveCustomer}
                className="rounded bg-green-600 px-6 py-3 text-white"
              >
                등록
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}