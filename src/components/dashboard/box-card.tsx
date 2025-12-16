import { LuBox, LuLock } from "react-icons/lu"
import { Box } from "@/types/db-types"
import { formatDate } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Session } from "@/types/session"
import { EditBox } from "./edit-box"
import { Button } from "../ui/button"
import { FiEdit, FiGlobe, FiTrash } from "react-icons/fi"
import { Deletebox } from "./delete-box"
import Link from "next/link"

type Props = {
  box: Box
  session: Session
}

export function BoxCard({ box, session }: Props) {
  const [url, setUrl] = useState<Location>()

  useEffect(() => {
    setUrl(window.location)
  }, [])

  return (
    <div
      className="transition-all shadow-sm rounded-md flex items-center justify-between bg-white border-2 border-white"
      key={box.id}>

      <div className="flex items-center w-full">
        <div className="w-full flex flex-col">
          <Link
            href={`/dashboard/box/${box.id}`}
            className="flex items-center gap-5 justify-between px-5 py-2.5 hover:bg-neutral-50">
            <div className="flex gap-5 items-center">
              {
                box.is_public
                  ? <LuBox size={22} className="text-neutral-400" />
                  : <LuLock size={22} className="text-red-400" />
              }
              <div className="flex flex-col gap-[5px]">
                <h3 className="text-neutral-800 font-bold text-[16px]">{box.title}</h3>
                {
                  box.description &&
                  <p className="text-sm text-neutral-500"> {box.description} </p>
                }
                <p className="text-xs text-neutral-800"> { formatDate(box.created_at!) } </p>
              </div>
            </div>
          </Link>

          <hr className="w-full" />

          <div className="flex justify-between items-center px-[15px] py-2.5">
            <span className="text-sm text-neutral-500"> { box.total_links } links </span>

            <div className="flex gap-2.5 items-center">
              <a href={`/box/${box.author_namespace!}/${box.slug}`} target="_blank" rel="noreferrer">
                <Button variant="outline" size="icon"> <FiGlobe /> </Button>
              </a>

              <EditBox session={session} box={box}>
                <Button variant="outline" size="icon"> <FiEdit /> </Button>
              </EditBox>

              <Deletebox box={box} session={session}>
                <Button variant="outline" size="icon"> <FiTrash /> </Button>
              </Deletebox>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
