"use client"

import * as React from "react"

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

type HomeButtonProps = {
  name: string
  email: string
  avatar?: string | null
}

export function SessionButton({ name, email, avatar }: HomeButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {/* {avatar && <img src={avatar} alt="avatar" className="w-4 h-4 rounded-full" />} */}
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
        <DropdownMenuCheckboxItem onClick={ signOut } className="px-2.5 text-red-500">
          Logout
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
