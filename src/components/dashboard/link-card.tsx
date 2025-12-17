import type { Link } from '@/types/db-types'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'
import { useDeleteLink } from '@/data/db-hooks/link-hooks'
import { formatDate } from '@/lib/utils'
import { MoveLinkButton } from './move-link-button'

type props = {
  link: Link,
}

export function LinkCard({ link }: props) {
  const { mutate, isPending } = useDeleteLink(link.box_id!)

  function getFavicon(url: string) {
    const host = new URL(url).hostname
    return `https://icons.duckduckgo.com/ip3/${host}.ico`
  }

  async function deleteLink() {
    mutate(link.id!)
    toast(`${link.title} removed`, {
      description: link.url,
    })
  }

  return (
    <article className="bg-white border-2 border-white hover:bg-neutral-50 transition-all shadow-sm rounded-md p-[15px] gap-5 items-start overflow-hidden flex md:items-center md:flex-row">
      <a className="w-full" href={link.url!} target="_blank" rel="noreferrer">
        <div className="flex flex-col gap-[5px]">
          <small className="text-neutral-600">{formatDate(link.created_at!)}</small>

          <span className="text-blue-600 text-[14px] truncate max-w-[600px]">
            {link.url!}
          </span>

          <div className="flex items-center gap-2.5">
            <div className="p-[3px] dark:bg-neutral-700 rounded-[3px]">
              <img
                src={getFavicon(link.url!)}
                alt="favicon"
                className="w-5 h-5 min-w-5 min-h-5"
              />
            </div>
            <span className="text-neutral-900 text-sm break-all max-w-[600px]">
              {link.title!}
            </span>
          </div>
        </div>
      </a>

      <div className="flex flex-col gap-2.5">
        <Button
          disabled={isPending}
          onClick={deleteLink}
          variant="outline"
          size="icon-sm"
        >
          {isPending ? (
            <Spinner className="size-4" />
          ) : (
            <Trash className="text-color" size={15} />
          )}
        </Button>

        <MoveLinkButton />
      </div>
    </article>
  )
}