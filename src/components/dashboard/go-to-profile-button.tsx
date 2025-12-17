"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import { LuUser } from "react-icons/lu";
import { getNamespace } from "@/lib/utils";
import { SessionContext } from "@/context/session-context";
import { useContext } from "react";

export function GoToProfileButton() {
  const session = useContext(SessionContext)

  return (
    <Link className="inline-flex" href={`/profile/${getNamespace(session!.user.email)}`}>
      <Button variant="outline" className="cursor-pointer">
        <LuUser /> Public profile
      </Button>
    </Link>
  )
}