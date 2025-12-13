import { BoxContent } from "@/components/box-content"
import Link from "next/link"
import Image from "next/image"
import { DashboardFooter } from "@/components/dashboard-footer"
import { Session } from "@/types/session"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { Button } from "@/components/ui/button"
import { FiChevronLeft } from "react-icons/fi"
import { MdOutlineSpaceDashboard } from "react-icons/md";

export default async function BoxPage( { params }: any ) {
  const { namespace, slug } = await params

  const session: Session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div className="flex flex-col w-full min-h-screen justify-between items-center gap-5">
      <Link className="mt-[50px]" href="/">
        <Image
          className="w-fuill max-w-[120px] h-auto"
          src="/images/logo.svg"
          alt="logo"
          width={60}
          height={60}
        />
      </Link>

      <BoxContent namespace={namespace} slug={slug} />

      <DashboardFooter />

      { session &&
        <Link href={`/dashboard/`} className="fixed bottom-5 right-5 leading-5">
          <Button size="icon-lg" className="cursor-pointer">
            <MdOutlineSpaceDashboard />
          </Button>
        </Link>
      }
    </div>
  )
}
