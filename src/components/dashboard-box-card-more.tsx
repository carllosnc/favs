import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { Box } from "@/types/db-types"
import { MdOutlineMoreVert } from "react-icons/md";

export function DashboardBoxCardMore({ box }: { box: Box }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MdOutlineMoreVert />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuCheckboxItem className="px-2.5">
          Rename box
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem className="px-2.5 text-red-500">
          Delete box
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}