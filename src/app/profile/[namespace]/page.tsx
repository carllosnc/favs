import { DashboardFooter } from "@/components/dashboard-footer"
import { ProfileHeader } from "@/components/profile-header"
import { ProfileBoxes } from "@/components/profile-boxes"
import Image from "next/image"
import Link from "next/link"

export default async function PublicBox({ params }: any) {
  const { namespace } = await params

  return (
    <div className="flex flex-col justify-between flex-1 pt-10 gap-[30px] items-center w-full">
      <Link href="/">
        <Image
          className="w-fuill max-w-[120px] h-auto"
          src="/images/logo.svg"
          alt="logo"
          width={60}
          height={60}
        />
      </Link>

      <ProfileHeader namespace={namespace} />
      <ProfileBoxes namespace={namespace} />
      <DashboardFooter />
    </div>
  )
}
