"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { Session } from "@/types/session"
import { useBoxes } from "@/data/db-hooks/box-hooks"
import { Box } from "@/types/db-types"
import Link from "next/link"

export function DashboardBoxSheet({ session }: { session: Session }) {
  const { data, isLoading } = useBoxes(session!.user.id!)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline"> Boxes </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[250px]" side="left">
        <SheetHeader>
          <SheetTitle> {session!.user.name} Boxes </SheetTitle>
        </SheetHeader>
        <div className="px-5 flex flex-col gap-2.5">
          { data?.map((box: Box) => (
            <Link
              key={box.id}
              href={`/dashboard/box/${box.id}`}
              className="text-sm text-blue-600 hover:underline">
              {box.title}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
