import { Footer } from "@/components/footer"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileBoxes } from "@/components/profile/profile-boxes"
import Image from "next/image"
import Link from "next/link"

export default async function PublicBox({ params }: any) {
  const { namespace } = await params

  return (
    <div className="flex flex-col justify-between min-h-screen pt-10 gap-[30px] items-center w-full">
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
      <div className="w-full flex-1">
        <ProfileBoxes namespace={namespace} />
      </div>
      <Footer />
    </div>
  )
}
