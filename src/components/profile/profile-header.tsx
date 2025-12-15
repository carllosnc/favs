"use client"

import { useUser } from "@/data/db-hooks/user-hooks"
import { User } from "better-auth"

export function ProfileHeader({ namespace }: { namespace: string }) {
  const { data } = useUser(namespace)
  const user = data?.[0] as User

  return (
    <div className="flex gap-2.5 items-center">
      <p className="text-sm"> Favs by <b>{namespace}</b> </p>
    </div>
  )
}

