"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SessionContext } from "@/context/session-context"
import { useBoxes } from "@/data/db-hooks/box-hooks"
import { Box, Link, NewLink } from "@/types/db-types"
import { useContext, useEffect } from "react"
import { LuArrowUpRight } from "react-icons/lu"
import { Spinner } from "../ui/spinner"
import { useMoveLink } from "@/data/db-hooks/link-hooks"
import { toast } from "sonner"

export function MoveLinkButton({ link }: { link: Link }) {
  const session = useContext(SessionContext)
  const { data, isLoading } = useBoxes(session!.user.id!)
  const { mutate, isPending } = useMoveLink(link)

  function excludeCurrentBox(box: Box) {
    return box.id !== link.box_id
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-sm">
          {isPending ? <Spinner width={20} /> : <LuArrowUpRight />}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Move link to</DropdownMenuLabel>

        <DropdownMenuSeparator />

        { isLoading && <Spinner width={20} /> }

        {
          data && data?.filter(excludeCurrentBox).map((box: Box) => (
            <DropdownMenuCheckboxItem className="px-2.5" key={box.id} onClick={() => {
              const movedLink: NewLink = structuredClone(link)
              delete movedLink.id
              delete movedLink.created_at
              movedLink.box_id = box.id

              toast(`Link moved to:`, {
                description: box.title,
              })

              mutate(movedLink)
            }}>
              {box.title}
            </DropdownMenuCheckboxItem>
          ))
        }

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
