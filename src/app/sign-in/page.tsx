"use client"

import { googleSignIn } from "@/lib/auth-utils";
import { Button } from "@/components/ui/button";
import Image from "next/image"
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function SignInPage(){
  return (
      <div className="flex min-h-screen flex-col gap-10 justify-center items-center">
        <Image
          className="w-fuill max-w-[120px] h-auto"
          src="/images/logo.svg"
          alt="logo"
          width={200}
          height={200}
        />
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-2.5">
            <span className="text-neutral-500 text-[16px]"> Welcome, do login to continue</span>
            <Button variant="outline" onClick={() => { googleSignIn() }}>
              <FcGoogle />
              Sign with Google
            </Button>
          </div>
          <Link href="/" className="text-center text-blue-600 text-sm"> ← Back to home </Link>
        </div>
      </div>
  )
}
