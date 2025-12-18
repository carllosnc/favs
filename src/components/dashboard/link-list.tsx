import { Link } from "@/types/db-types"
import { LinkCard } from "./link-card"

type Props = {
  links: Link[]
}

export function LinkList({ links }: Props) {
  if (links?.length === 0) {
    return (
      <div className="flex flex-col text-center gap-2.5 w-full" >
        <span className="text-sm"> Empty box </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2.5">
      { links?.map((link: Link) => (<LinkCard key={link.id} link={link} />)) }
    </div>
  )
}