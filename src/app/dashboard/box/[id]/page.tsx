import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { Session } from "@/types/session"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BoxContent } from "@/components/dashboard/box-content"

export default async function DashboardBoxPage({ params }: any ){
  const { id } = await params

  const session: Session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div className="flex flex-col justify-between items-center w-full min-h-screen">
      <Header session={session} />
      <div className="flex-1 flex w-full pt-5 flex-col gap-2.5">
        <BoxContent boxId={id} session={session} />
      </div>
      <Footer />
    </div>
  )
}
