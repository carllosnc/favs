import { LuBox, LuLock } from "react-icons/lu"
import { Box } from "@/types/db-types"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BoxCardActions } from "./box-card-actions"

export function BoxCard({ box }: { box: Box }) {
  const [url, setUrl] = useState<Location>()

  useEffect(() => {
    setUrl(window.location)
  }, [])

  return (
    <Link
      href={`/dashboard/box/${box.id}`}
      className="transition-all shadow-sm rounded-md py-[15px] px-5 flex gap-[15px] items-center justify-between bg-white border border-white hover:border-blue-500"
      key={box.id}>
      <div className="flex gap-5 items-center w-full">
        <div className="w-full flex flex-col gap-2.5">
          <div className="flex items-center gap-5 justify-between">

            <div className="flex gap-5 items-center">
              {
                box.is_public
                  ? <LuBox size={22} className="text-neutral-400" />
                  : <LuLock size={22} className="text-red-400" />
              }
              <div className="flex flex-col gap-[5px]">
                <h3 className="text-neutral-800 font-bold text-[16px]">{box.title}</h3>
                <p className="text-sm text-neutral-800"> { formatDate(box.created_at!) } </p>
                {
                  box.description &&
                  <p className="text-sm text-neutral-500"> {box.description} </p>
                }
              </div>
            </div>

            <BoxCardActions box={box} />

          </div>
          <hr className="w-full" />
          <span className="text-blue-600 text-sm">
            {url?.host}/box/{box.author_namespace}/{box.slug}
          </span>
        </div>
      </div>
    </Link>
  )
}