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
import { signOut } from "@/lib/auth-utils"
import Link from "next/link"
import { getNamespace } from "@/lib/utils"
import { useRouter } from "next/navigation"

type HomeButtonProps = {
  name: string
  email: string
  avatar?: string | null
}

export function SessionButton({ name, email, avatar }: HomeButtonProps) {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span>{ getNamespace(email) }</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel className="truncate"> {email} </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem className="px-2.5">
          <Link href="/dashboard" prefetch> Dashboard </Link>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem className="px-2.5">
          <Link href="/" prefetch> Home </Link>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem onClick={ async () => {
          await signOut()
          router.refresh()
        } } className="px-2.5 text-red-500">
          Logout
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
