import { Metadata } from "next";
import { SignInButton } from "@/components/sign-in-button";

export const metadata: Metadata = {
  title: "Sign in - FAVS",
};

export default function SignInPage(){
  return (
    <div className="flex min-h-screen flex-col gap-10 justify-center items-center">
      <img
        className="w-fuill max-w-[120px] h-auto"
        src="/images/logo.svg"
        alt="logo"
        width={200}
        height={200}
      />
      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col gap-2.5">
          <span className="text-neutral-500 text-[16px]">
            Welcome, do login to continue
          </span>
          <SignInButton />
        </div>
        <a href="/" className="text-center text-blue-600 text-sm"> ← Back to home </a>
      </div>
    </div>
  )
}
