import type { NewLink, Box, SiteMetadata, YouTubeMetadata } from '@/types/db-types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode, useState } from 'react'
import { Button } from '@/components/ui/button'
import { newLinkSchema } from '@/data/zod-schemas/new-link-schema'
import { useCreateLink } from '@/data/db-hooks/link-hooks'
import { METADATA_API_URL } from '@/lib/constants'

type Props = {
  box: Box
  children: ReactNode
}

export function CreateLink({ box, children }: Props) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { mutate } = useCreateLink(box.id)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(newLinkSchema),
  })

  const onSubmit = async (data: any) => {
    setLoading(true)

    const metadataRequest = await fetch(
      `${METADATA_API_URL}?url=${data.url}`
    )

    const metadataData: SiteMetadata | YouTubeMetadata = await metadataRequest.json()

    const description =
      (metadataData as SiteMetadata).description ||
      (metadataData as YouTubeMetadata).author_name

    const image =
      (metadataData as SiteMetadata).image ||
      (metadataData as YouTubeMetadata).thumbnail_url

    const link: NewLink = {
      url: data.url,
      title: metadataData.title,
      description: description,
      image: image,
      box_id: box.id,
      user_id: box.user_id!,
    }

    mutate(link)

    setLoading(false)
    setOpen(false)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>

      <DialogContent className="border dialog-content gap-[30px] border-white dark:border-neutral-800 w-full max-w-[400px]">
        <DialogHeader className="text-left">
          <DialogTitle className="font-bold text-md"> Create new link </DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-3">
            <Label className="inline-flex gap-1.5 items-center">
              <span className="text-sm">URL</span>
              {errors.url && (
                <span className="text-red-500 dark:text-red-400">
                  {errors.url.message as string}
                </span>
              )}
            </Label>
            <Input placeholder="Enter link URL" {...register('url')} />
          </div>
          <div>
            <Button type="submit" size="sm" disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}