import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BoxContent } from "@/components/dashboard/box-content"

export default async function DashboardBoxPage({ params }: any ){
  const { id } = await params

  return (
    <div className="flex flex-col justify-between items-center w-full min-h-screen">
      <Header />
      <div className="flex-1 flex w-full pt-5 flex-col gap-2.5">
        <BoxContent boxId={id} />
      </div>
      <Footer />
    </div>
  )
}
