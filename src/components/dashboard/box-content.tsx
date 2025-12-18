"use client"

import Link from "next/link"
import type { Link as LinkType } from "@/types/db-types"
import { useBox } from "@/data/db-hooks/box-hooks"
import { Box } from "@/types/db-types"
import { Button } from "../ui/button"
import { FaChevronLeft } from "react-icons/fa";
import { FiEdit, FiGlobe, FiTrash } from "react-icons/fi";
import { AllBoxesSheet } from "./all-boxes-sheet"
import { CreateLink } from "./create-link"
import { LinkList } from "./link-list"
import { EditBox } from "./edit-box"
import { SetBoxPublic } from "./set-box-public"
import { Deletebox } from "./delete-box"
import { SessionContext } from "@/context/session-context"
import { useContext } from "react"
import Loading from "../loading"

type Props = {
  boxId: string
}

export function BoxContent({boxId }: Props) {
  const session = useContext(SessionContext)

  const { data, isLoading } = useBox(boxId, session?.user.id!)
  const box = data?.box as Box
  const links = data?.links as LinkType[]

  if (isLoading) return <Loading />

  if (!box) {
    return (
      <div className="flex flex-col flex-1 gap-5 w-full pt-10 justify-center items-center" >
        <span className="text-sm"> Box not found </span>
        <Link href={`/dashboard`} prefetch>
          <Button className="cursor-pointer text-blue-500" variant="outline" >
            ← Back to dashboard
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <header className="flex items-center gap-[25px]">
        <Link href={`/dashboard`} prefetch>
          <Button className="cursor-pointer" variant="outline" size="icon">
            <FaChevronLeft />
          </Button>
        </Link>

        <div className="flex flex-col gap-0">
          <h1 className="w-full text-lg"> {box.title} </h1>
          { box.description && <p className="text-sm text-neutral-500"> {box.description} </p> }
        </div>
      </header>

      <div className="w-full p-2.5 flex md:flex-col md:justify-start md:items-start items-center justify-between gap-[15px] rounded-md bg-white shadow-sm">
        <div className="flex items-center gap-2.5">
          <AllBoxesSheet />
          <CreateLink box={box} />
        </div>

        <hr className="border-neutral-200 w-full" />

        <div className="flex items-center gap-2.5">
          <SetBoxPublic box={box} />

          <a href={`/box/${box.author_namespace!}/${box.slug}`} target="_blank" rel="noreferrer">
            <Button variant="outline" size="icon"> <FiGlobe /> </Button>
          </a>

          <EditBox box={box}>
            <Button variant="outline" size="icon"> <FiEdit /> </Button>
          </EditBox>

          <Deletebox box={box}>
            <Button variant="outline" size="icon"> <FiTrash /> </Button>
          </Deletebox>
        </div>
      </div>

      {/* list all links here! */}
      <LinkList links={links} />
    </div>
  )
}