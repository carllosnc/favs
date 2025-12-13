import { DashboardFooter } from "@/components/dashboard-footer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNewBox } from "@/components/dashboard-new-box"
import { DashboardListBoxes } from "@/components/dashboard-list-boxes"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { Session } from "@/types/session"
import Link from "next/link"
import { getNamespace } from "@/lib/utils"

export default async function Dashboard(){
  const session: Session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div className="flex flex-col justify-between items-center w-full min-h-screen">
      <DashboardHeader session={session} />

      <div className="flex-1 flex w-full pt-5 flex-col gap-5">
        <div className="flex items-center justify-between gap-2.5 shadow-sm rounded-md bg-white p-2.5">
          <Link className="inline-flex" href={`/profile/${getNamespace(session!.user.email)}`}>
            <Button variant="outline" className="cursor-pointer">
              Public profile
            </Button>
          </Link>
          <DashboardNewBox session={session} />
        </div>
        <DashboardListBoxes session={session} />
      </div>
      <DashboardFooter />
    </div>
  )
}