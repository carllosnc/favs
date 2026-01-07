"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link"
import { SessionButton } from "@/components/session-button";
import { SessionContext } from "@/context/session-context";
import { useContext } from "react";

export function Header() {
  const session = useContext(SessionContext)

  return (
    <header className="py-2.5 w-full">
      <div className="flex justify-between items-center w-full m-auto">
        <Link href="/" prefetch>
          <img
            className="w-fuill max-w-[30px] h-auto"
            src="/images/logo-symbol.svg"
            alt="logo"
            width={60}
            height={60}
          />
        </Link>

        <div>
          {
            session &&
            <div className="flex gap-2.5">
            <Link href="/dashboard" prefetch>
              <Button className="text-blue-500 text-sm cursor-pointer" variant="outline">
                Your favs
              </Button>
            </Link>

            <SessionButton
              name={session.user.name}
              email={session.user.email}
              avatar={session.user.image}
            />
            </div>
          }

          { !session && <Link href="/sign-in" prefetch><Button> Sign in </Button></Link> }
        </div>
      </div>
    </header>
  )
}