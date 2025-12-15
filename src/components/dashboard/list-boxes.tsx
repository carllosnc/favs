"use client"

import { useBoxes } from "@/data/db-hooks/box-hooks"
import { Session } from "@/types/session"
import { useState } from "react"
import { Box } from "@/types/db-types"
import { Input } from "../ui/input"
import { IoFilter } from "react-icons/io5"
import { Skeleton } from "../ui/skeleton"
import { BoxCard } from "./box-card"

export function ListBoxes({ session }: { session: Session }) {
  const { data: boxes, isLoading } = useBoxes(session?.user.id!)
  const [filter, setFilter] = useState<string>()

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
          boxes?.filter(filterBox).map((box: Box) => (<BoxCard key={box.id} box={box} />))
        }
      </div>
    </div>
  )
}
