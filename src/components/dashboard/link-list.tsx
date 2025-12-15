import { useLinks } from "@/data/db-hooks/link-hooks"
import { Box, Link } from "@/types/db-types"
import { LinkCard } from "./link-card"

type Props = {
  box: Box
}

export function LinkList({ box }: Props) {
  const { data, isLoading } = useLinks(box.id)

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2.5 w-full text-center" >
        <span className="text-sm"> Loading... </span>
      </div>
    )
  }

  if (data?.length === 0) {
    return (
      <div className="flex flex-col text-center gap-2.5 w-full" >
        <span className="text-sm"> Empty box </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2.5">
      { data?.map((link: Link) => (<LinkCard key={link.id} link={link} />)) }
    </div>
  )
}