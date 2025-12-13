"use client"

import Link from "next/link"
import { useBox } from "@/data/db-hooks/box-hooks"
import { Box } from "@/types/db-types"
import { Session } from "@/types/session"
import { Button } from "./ui/button"
import { FaChevronLeft } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { DashboardBoxSheet } from "./dashboard-box-sheet"
import { DashboardBoxNewLink } from "./dashboard-box-new-link"
import { DashBoardBoxLinkList } from "./dashboard-box-link-list"
import { DashboardEditBox } from "./dashboard-edit-box"
import { DashboardBoxSetPublic } from "./dashboard-box-set-public"
import { DashboardBoxDelete } from "./dashboard-box-delete"

type Props = {
  boxId: string
  session: Session
}

export function DashboardBoxContent({boxId, session}: Props) {
  const { data, isLoading } = useBox(boxId, session?.user.id!)
  const box: Box = data?.[0]!

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2.5 w-full" >
        <span className="text-sm"> Loading... </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <header className="flex items-center gap-[25px]">
        <Link href={`/dashboard`} >
          <Button className="cursor-pointer" variant="outline" size="icon"> <FaChevronLeft /> </Button>
        </Link>
        <div className="flex flex-col gap-0">
          <h1 className="w-full text-lg"> {box.title} </h1>
          { box.description && <p className="text-sm text-neutral-500"> {box.description} </p> }
        </div>
      </header>

      <div className="w-full p-2.5 flex items-center justify-between gap-[15px] rounded-md bg-white shadow-sm">
        <div className="flex items-center gap-2.5">
          <DashboardBoxSheet session={session} />
          <DashboardBoxNewLink box={box} />
        </div>

        <div className="flex items-center gap-2.5">
          <DashboardBoxSetPublic box={box} session={session} />

          <a href={`/box/${box.author_namespace!}/${box.slug}`} target="_blank" rel="noreferrer">
            <Button variant="outline" size="icon"> <FiGlobe /> </Button>
          </a>

          <DashboardEditBox session={session} box={box} />
          <DashboardBoxDelete box={box} session={session} />
        </div>
      </div>

      <DashBoardBoxLinkList box={box} />
    </div>
  )
}