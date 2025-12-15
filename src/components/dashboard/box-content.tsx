"use client"

import Link from "next/link"
import { useBox } from "@/data/db-hooks/box-hooks"
import { Box } from "@/types/db-types"
import { Session } from "@/types/session"
import { Button } from "../ui/button"
import { FaChevronLeft } from "react-icons/fa";
import { FiGlobe, FiTrash } from "react-icons/fi";
import { AllBoxesSheet } from "./all-boxes-sheet"
import { CreateLink } from "./create-link"
import { LinkList } from "./link-list"
import { EditBox } from "./edit-box"
import { SetBoxPublic } from "./set-box-public"
import { Deletebox } from "./delete-box"

type Props = {
  boxId: string
  session: Session
}

export function BoxContent({boxId, session}: Props) {
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
          <Button className="cursor-pointer" variant="outline" size="icon">
            <FaChevronLeft />
          </Button>
        </Link>
        <div className="flex flex-col gap-0">
          <h1 className="w-full text-lg"> {box.title} </h1>
          { box.description && <p className="text-sm text-neutral-500"> {box.description} </p> }
        </div>
      </header>

      <div className="w-full p-2.5 flex items-center justify-between gap-[15px] rounded-md bg-white shadow-sm">
        <div className="flex items-center gap-2.5">
          <AllBoxesSheet session={session} />
          <CreateLink box={box} />
        </div>

        <div className="flex items-center gap-2.5">
          <SetBoxPublic box={box} session={session} />

          <a href={`/box/${box.author_namespace!}/${box.slug}`} target="_blank" rel="noreferrer">
            <Button variant="outline" size="icon"> <FiGlobe /> </Button>
          </a>

          <EditBox session={session} box={box} />
          <Deletebox box={box} session={session}>
            <Button variant="outline" size="icon"> <FiTrash /> </Button>
          </Deletebox>
        </div>
      </div>

      <LinkList box={box} />
    </div>
  )
}