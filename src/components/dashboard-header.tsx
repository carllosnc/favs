import Image from "next/image"
import { Button } from "@/components/ui/button";
import Link from "next/link"
import { SessionButton } from "@/components/session-button";
import type { Session } from "@/types/session";

export function DashboardHeader({ session }: { session: Session }) {
  return (
    <header className="py-2.5 w-full">
      <div className="flex justify-between items-center w-full m-auto">
        <Link href="/">
          <Image
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
            <Link href="/dashboard">
              <Button className="text-blue-500 cursor-pointer" variant="outline">
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
          { !session && <Link href="/sign-in"><Button> Sign in </Button></Link> }
        </div>
      </div>
    </header>
  )
}