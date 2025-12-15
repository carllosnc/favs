import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { Box } from "@/types/db-types"
import { MdOutlineMoreVert } from "react-icons/md";
import Link from "next/link";
import { Deletebox } from "./delete-box";
import { Session } from "@/types/session";

type Props = {
  box: Box
  session: Session
}

export function BoxCardActions({ box, session }: Props) {
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

        <DropdownMenuCheckboxItem className="px-2.5">
          <Link href={`/box/${box.author_namespace!}/${box.slug}`}>
            Go to public page
          </Link>
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem className="p-0" onClick={(e) => { e.preventDefault() }}>
          <Deletebox box={box} session={session}>
            <span className="w-full h-full px-2.5 py-1.5 text-red-500"> Delete box </span>
          </Deletebox>
        </DropdownMenuCheckboxItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}