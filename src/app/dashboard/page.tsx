import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { CreateBox } from "@/components/dashboard/create-box"
import { ListBoxes } from "@/components/dashboard/list-boxes"
import { GoToProfileButton } from "@/components/dashboard/go-to-profile-button"

export default async function Dashboard(){
  return (
    <div className="flex flex-col justify-between items-center w-full min-h-screen">
      <Header />

      <div className="flex-1 flex w-full pt-5 flex-col gap-5">
        <div className="flex items-center justify-between gap-2.5 shadow-sm rounded-md bg-white p-2.5">
          <GoToProfileButton />
          <CreateBox />
        </div>
        <ListBoxes />
      </div>
      <Footer />
    </div>
  )
}