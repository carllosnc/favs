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
import { LuEllipsisVertical } from "react-icons/lu";

export function MoveLinkButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-sm">
          <LuEllipsisVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Move to box</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem className="px-2.5">
          Box 1
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem className="px-2.5">
          Box 2
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem className="px-2.5">
          Box 3
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
