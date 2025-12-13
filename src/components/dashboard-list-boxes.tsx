"use client"

import { useBoxes } from "@/data/db-hooks/box-hooks"
import { Session } from "@/types/session"
import { LuBox } from "react-icons/lu"
import { useEffect, useState } from "react"
import { Box } from "@/types/db-types"
import { formatDate } from "@/lib/utils"
import { Input } from "./ui/input"
import { IoFilter } from "react-icons/io5"
import { Skeleton } from "./ui/skeleton"
import Link from "next/link"

export function DashboardListBoxes({ session }: { session: Session }) {
  const { data: boxes, isLoading } = useBoxes(session?.user.id!)
  const [filter, setFilter] = useState<string>()
  const [url, setUrl] = useState<Location>()

  useEffect(() => {
    setUrl(window.location)
  }, [])


  function filterBox(box: Box) {
    return !filter || box.title.toLowerCase().includes(filter.toLowerCase())
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2.5 w-full" >
        <Skeleton className="h-20 w-full rounded-[5px]" />
        <Skeleton className="h-20 w-full rounded-[5px]" />
        <Skeleton className="h-20 w-full rounded-[5px]" />
        <Skeleton className="h-20 w-full rounded-[5px]" />
        <Skeleton className="h-20 w-full rounded-[5px]" />
        <Skeleton className="h-20 w-full rounded-[5px]" />
        <Skeleton className="h-20 w-full rounded-[5px]" />
        <Skeleton className="h-20 w-full rounded-[5px]" />
        <Skeleton className="h-20 w-full rounded-[5px]" />
        <Skeleton className="h-20 w-full rounded-[5px]" />
        <Skeleton className="h-20 w-full rounded-[5px]" />
        <Skeleton className="h-20 w-full rounded-[5px]" />
        <Skeleton className="h-20 w-full rounded-[5px]" />
        <Skeleton className="h-20 w-full rounded-[5px]" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      { boxes?.length === 0 && <div className="w-full text-sm text-center p-5"> No boxes yet </div> }

      {
        boxes && boxes?.length > 0 &&
        <div className="flex items-center gap-5">
          <IoFilter size={24} className="text-neutral-400" />
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-white"
            placeholder="Filter box by name"
          />
        </div>
      }

      <div className="flex flex-col gap-2.5">
        {
          boxes?.filter(filterBox).map((box: Box) => (
            <Link
              href={`/dashboard/box/${box.id}`}
              className="transition-all shadow-sm rounded-md py-[15px] px-5 flex gap-[15px] items-center justify-between bg-white border border-white hover:border-blue-500"
              key={box.id}>
              <div className="flex gap-5 items-center w-full">
                <div className="w-full flex flex-col gap-2.5">
                  <div className="flex items-center gap-5">
                    <LuBox size={22} className="text-neutral-400" />
                    <div className="flex flex-col gap-[5px]">
                      <h3 className="text-neutral-800 font-bold text-[16px]">{box.title}</h3>
                      <p className="text-sm text-neutral-800"> { formatDate(box.created_at!) } </p>
                      {
                        box.description &&
                        <p className="text-sm text-neutral-500"> {box.description} </p>
                      }
                    </div>
                  </div>
                  <hr className="w-full" />
                  <span className="text-blue-600 text-sm">
                    {url?.host}/box/{box.author_namespace}/{box.slug}
                  </span>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
