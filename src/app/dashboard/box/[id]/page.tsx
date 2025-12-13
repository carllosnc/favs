import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { Session } from "@/types/session"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardFooter } from "@/components/dashboard-footer"
import { DashboardBoxContent } from "@/components/dashboard-box-content"

export default async function DashboardBoxPage({ params }: any ){
  const { id } = await params

  const session: Session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div className="flex flex-col justify-between items-center w-full min-h-screen">
      <DashboardHeader session={session} />
      <div className="flex-1 flex w-full pt-5 flex-col gap-2.5">
        <DashboardBoxContent boxId={id} session={session} />
      </div>
      <DashboardFooter />
    </div>
  )
}
