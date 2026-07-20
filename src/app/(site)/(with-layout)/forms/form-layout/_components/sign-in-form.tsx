import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Checkbox } from "@/components/ui-elements/checkbox";
import Link from "next/link";

export function SignInForm() {
  return (
    <ShowcaseSection title="온라인 업무대장" className="p-6.5!">
      <form action="#">
        <InputGroup
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          className="mb-4.5"
        />

        <InputGroup
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />

        <div className="mt-5 mb-5.5 flex items-center justify-between">
          <Checkbox label="로그인 상태 유지" minimal withBg withIcon="check" />

          <Link href="#" className="text-body-sm text-primary hover:underline">
            비밀번호 찾기
          </Link>
        </div>

        <button className="hover:bg-opacity-90 flex w-full justify-center rounded-lg bg-primary p-3.25 font-medium text-white">
          로그인
        </button>
      </form>
    </ShowcaseSection>
  );
}
