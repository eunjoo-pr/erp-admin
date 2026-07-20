
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import hasPermission from "@/utils/hasPermission";
import { redirect } from "next/navigation";
import { Suspense } from "react";


export default async function ManageTeamPage() {
  // const permission = await hasPermission({
//   user: ["list"],
// });

// if (!permission) {
//   return redirect(
//     `/?toast_type=error&message=${encodeURIComponent(
//       "You don't have permission to access Manage Team page",
//     )}`,
//   );
// }



 return (
  <div className="mx-auto w-full">
    <Breadcrumb pageName="고객사 관리" />

    <div className="rounded-xl border bg-white p-10">
      고객사 관리 화면 준비 중
    </div>
  </div>
);
}
