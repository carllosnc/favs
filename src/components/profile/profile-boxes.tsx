"use client"

import { useBoxesByNamespace } from "@/data/db-hooks/box-hooks"
import { Box } from "@/types/db-types"
import { LuBox } from "react-icons/lu"
import Loading from "../loading"

type Props = {
  namespace: string
}

export function ProfileBoxes({ namespace }: Props) {
  const { data: boxes, isLoading } = useBoxesByNamespace(namespace)

  if (isLoading) return <Loading />

  // if (boxes?.length === 0) {
    return (
      <div className="flex-1  w-full flex flex-col items-center gap-2.5">
        <div className="w-full text-sm text-center p-5"> No boxes yet </div>
      </div>
    )
  // }

  // return (
  //   <div className="flex-1 w-full flex flex-col items-center gap-2.5">
  //     { boxes?.length === 0 && <div className="w-full text-sm text-center p-5"> No boxes yet </div> }

  //     {
  //       boxes?.map((box: Box) => (
  //         <a
  //           href={`/box/${namespace}/${box.slug}`}
  //           key={box.id}
  //           className="bg-white shadow-sm max-w-[500px] border border-white hover:border-blue-500 transition-all flex items-center gap-[15px] rounded-md w-full text-sm px-[15px] py-[15px] justify-between">
  //           <div className="flex items-center gap-[15px]">
  //             <LuBox size={22} className="text-neutral-400" />
  //             <div className="flex flex-col gap-[3px]">
  //               <h3 className="font-bold"> {box.title} </h3>
  //               { box.description && <span className="text-sm text-neutral-500"> {box.description} </span> }
  //             </div>
  //           </div>
  //           <span className="text-sm text-neutral-500"> {box.total_links} links </span>
  //         </a>
  //       ))
  //     }
  //   </div>
  // )
}
