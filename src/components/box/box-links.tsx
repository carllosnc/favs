"use client"

import { Link } from "@/types/db-types"
import { EmptyBox } from "../empty-box";
import { BoxLinkCard } from "./box-link-card";

export function BoxLinks({ isTiny, links }: { isTiny: boolean, links: Link[] }) {

  if (links?.length === 0) {
    return <div> <EmptyBox /> </div>
  }

  return (
    <div className="flex flex-col w-full gap-[15px] justify-center items-center">
      {
        links?.map((link: Link) => (
          <BoxLinkCard key={link.id} link={link} isTiny={isTiny} />
        ))
      }
    </div>
  )
}
