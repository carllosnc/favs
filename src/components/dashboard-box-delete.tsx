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
import { Session } from "@/types/session";
import { Button } from "./ui/button";
import { FiTrash } from "react-icons/fi";
import { useDeleteBox } from "@/data/db-hooks/box-hooks";
import { Spinner } from "./ui/spinner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function DashboardBoxDelete({ box, session }: { box: Box, session: Session }) {
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
        <Button variant="outline" size="icon"> <FiTrash /> </Button>
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
          <AlertDialogAction onClick={deleteBox} disabled={isPending}>
            {isPending ? <Spinner className="text-white" /> : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}