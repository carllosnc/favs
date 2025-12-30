"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Box } from "@/types/db-types";
import { useDeleteBox } from "@/data/db-hooks/box-hooks";
import { Spinner } from "../ui/spinner";
import { ReactNode, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SessionContext } from "@/context/session-context";

type Props = {
  box: Box
  children: ReactNode
}

export function Deletebox({ box, children }: Props) {
  const session = useContext(SessionContext)
  const { mutate, isPending, isSuccess } = useDeleteBox({ userId: session!.user.id! })
  const router = useRouter()

  async function deleteBox() {
    mutate(box)
  }

  useEffect(() => {
    if (isSuccess) { router.push(`/dashboard`) }
  }, [isSuccess])

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        { children }
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the box and all its links.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-700" onClick={deleteBox} disabled={isPending}>
            {isPending ? <Spinner className="text-white" /> : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}