"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "@radix-ui/react-label"
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { newBoxSchema } from "@/data/zod-schemas/new-box-schema"
import { z } from 'zod'
import { useCreateBox } from "@/data/db-hooks/box-hooks"
import type { NewBox } from "@/types/db-types"
import { extractErrorDetails } from "@/lib/error"
import { getNamespace, getSlug } from "@/lib/utils"
import { LuBox } from "react-icons/lu"
import { SessionContext } from "@/context/session-context"

export function CreateBox(){
  const [open, setOpen] = useState(false)
  const { mutate, isPending, isError, error, isSuccess } = useCreateBox()
  const session = useContext(SessionContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof newBoxSchema>>({
    resolver: zodResolver(newBoxSchema),
  })

  const onSubmit: SubmitHandler<z.infer<typeof newBoxSchema>> = (data) => {
    if (!session?.user?.id) return

    const box: NewBox = {
      title: data.title.trim(),
      slug: getSlug(data.title.trim()),
      description: data.description,
      author_namespace: getNamespace(session.user.email),
      user_id: session.user.id,
      author_name: session.user.name,
    }

    mutate(box)
  }

  useEffect(() => {
    if (isSuccess) {
      setOpen(false)
      reset()
    }
  }, [isSuccess])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <LuBox size={22} className="text-white" />
          New box
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="mb-2.5 text-[16px] text-left">Create new Box</DialogTitle>
        </DialogHeader>

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2.5">
            <Label className="inline-flex gap-1.5 items-center text-sm">
              <span>Title: </span>
              {errors.title && (
                <span className="text-red-500 dark:text-red-400">
                  {errors.title.message as string}
                </span>
              )}
            </Label>
            <Input placeholder="Enter box title" {...register('title')} />
          </div>

          <div className="flex flex-col gap-2.5">
            <Label className="inline-flex gap-1.5 items-center text-sm">
              <span>Description: </span>
              {errors.description && (
                <span className="text-red-500 dark:text-red-400">
                  {errors.description.message as string}
                </span>
              )}
            </Label>
            <Input
              placeholder="Enter box description"
              {...register('description')}
            />
          </div>

          {error && (
            <div className="text-[13px] text-red-600">
              <span>
                {extractErrorDetails(
                  (error as Error).message
                )?.errorName.toLowerCase()}
              </span>
            </div>
          )}

          <div>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  )
}

