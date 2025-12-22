"use client"

import { Footer } from "@/components/footer"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileBoxes } from "@/components/profile/profile-boxes"
import Link from "next/link"
import { Metadata } from "next";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function PublicBox() {
  const params = useParams<{ namespace: string }>()
  const { namespace } = params

  useEffect(() => {
    document.title = `${namespace} - FAVS`
  }, [namespace])

  return (
    <div className="flex flex-col justify-between min-h-screen pt-10 gap-[30px] items-center w-full">
      <Link href="/">
        <img
          className="w-fuill max-w-[120px] h-auto"
          src="/images/logo.svg"
          alt="logo"
          width={60}
          height={60}
        />
      </Link>

      <ProfileHeader namespace={namespace} />
      <ProfileBoxes namespace={namespace} />

      <Footer />
    </div>
  )
}
