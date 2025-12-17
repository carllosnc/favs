"use client"

import { useBoxBySlug } from "@/data/db-hooks/box-hooks"
import { Box } from "@/types/db-types"
import { BoxLinks } from "./box-links"
import { BoxSheet } from "./box-sheet"
import { Switch } from "../ui/switch"
import { useState } from "react"

type Props = {
  namespace: string
  slug: string
}

export function BoxPageContent({ namespace, slug }: Props) {
  const { data, isLoading } = useBoxBySlug(namespace, slug)
  const [ isTiny, setIsTiny ] = useState<boolean>(false)
  const box: Box = data?.[0]!

  if (isLoading) {
    return ( <div /> )
  }

  if (!box) {
    return (
      <div className="flex pt-5 w-full flex-col items-center flex-1 gap-5">
        <span>Box not found</span>
        <BoxSheet namespace={namespace} />
      </div>
    )
  }

  return (
    <section className="flex w-full flex-col items-center flex-1 gap-5">
      <div className="text-sm text-center">
        <h1> { box.title } by <b>{ box.author_namespace }</b> </h1>
        { box.description && <p className="text-sm text-gray-500"> { box.description } </p> }
      </div>

      <div className="bg-white w-full max-w-[600px] p-2.5 rounded-md shadow-sm flex justify-between items-center">
        <BoxSheet namespace={namespace} />
        <div className="flex items-center gap-2.5">
          <Switch checked={isTiny} id="card" onCheckedChange={() => setIsTiny(!isTiny)} />
          <label htmlFor="card" className="text-sm text-neutral-500"> Tiny card</label>
        </div>
      </div>

      <hr  className="w-full border-neutral-300 max-w-[600px]" />

      <BoxLinks boxId={box.id} isTiny={isTiny} />
    </section>
  )
}