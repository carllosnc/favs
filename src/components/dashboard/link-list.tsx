import { Link } from "@/types/db-types"
import { LinkCard } from "./link-card"
import { EmptyBox } from "../empty-box"

type Props = {
  links: Link[]
}

export function LinkList({ links }: Props) {
  if (links?.length === 0) {
    return <EmptyBox />
  }

  return (
    <div className="flex flex-col gap-2.5">
      { links?.map((link: Link) => (<LinkCard key={link.id} link={link} />)) }
    </div>
  )
}