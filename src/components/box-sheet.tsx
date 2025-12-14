"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { useBoxesByNamespace } from "@/data/db-hooks/box-hooks"
import { Box } from "@/types/db-types"
import Link from "next/link"
import { MdOutlineMenu } from "react-icons/md"

export function BoxSheet({ namespace }: { namespace: string }) {
  const { data, isLoading } = useBoxesByNamespace(namespace)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <MdOutlineMenu /> Boxes by {namespace}
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[250px]" side="left">
        <SheetHeader>
          <SheetTitle> Boxes by {namespace} </SheetTitle>
        </SheetHeader>
        <div className="px-5 flex flex-col gap-2.5">
          { data?.map((box: Box) => (
            <Link
              key={box.id}
              href={`/box/${box.author_namespace!}/${box.slug}`}
              className="text-sm text-blue-600 hover:underline">
              {box.title}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
