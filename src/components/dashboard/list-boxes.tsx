"use client"

import { useBoxes } from "@/data/db-hooks/box-hooks"
import { useContext, useState } from "react"
import { Box } from "@/types/db-types"
import { Input } from "../ui/input"
import { IoFilter } from "react-icons/io5"
import { BoxCard } from "./box-card"
import { SessionContext } from "@/context/session-context"
import Loading from "../loading"
import { NoBox } from "../no-box"

export function ListBoxes() {
  const session = useContext(SessionContext)
  const { data: boxes, isLoading } = useBoxes(session?.user.id!)
  const [filter, setFilter] = useState<string>()

  function filterBox(box: Box) {
    return !filter || box.title.toLowerCase().includes(filter.toLowerCase())
  }

  if (isLoading) return <Loading />

  return (
    <div className="flex flex-col gap-5">
      { boxes?.length === 0 && <NoBox /> }

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
        { boxes?.filter(filterBox).map((box: Box) => (<BoxCard key={box.id} box={box} />)) }
      </div>
    </div>
  )
}
