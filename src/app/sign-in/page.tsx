"use client"

import { googleSignIn } from "@/lib/auth-utils";
import { Button } from "@/components/ui/button";
import Image from "next/image"
import { FcGoogle } from "react-icons/fc";

export default function SignInPage(){
  return (
    <div className="flex flex-col border justify-center items-center w-full h-screen">
      <div className="flex flex-col gap-[40px] justify-center items-center">
        <Image
          className="w-fuill max-w-[80px] h-auto"
          src="/images/logo.svg"
          alt="logo"
          width={200}
          height={200}
        />
        <div className="flex flex-col gap-[15px]">
          <span className="text-neutral-500 text-[16px]"> Welcome, do login to continue</span>
          <Button variant="outline" onClick={() => { googleSignIn() }}>
            <FcGoogle />
            Sign with Google
          </Button>
        </div>
      </div>
    </div>
  )
}
