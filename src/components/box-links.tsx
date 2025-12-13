"use client"

import { useLinks } from "@/data/db-hooks/link-hooks"
import { Link } from "@/types/db-types"
import { useEffect, useState } from "react"
import { BsBox } from "react-icons/bs";

function LinkImage({ link }: { link: Link }) {
  const [validImage, setValidImage] = useState(true)

  useEffect(() => {
    const img = new Image()
    img.src = link.image!
    img.onerror = () => {
      setValidImage(false)
    }
  }, [link])

  if (!validImage) {
    return null
  }

  return (
    <img
      className="w-full h-auto"
      src={link.image!}
      alt={link.title!}
      width={300}
      height={300}
    />
  )
}

export function BoxLinks({ boxId, isTiny }: { boxId: string, isTiny: boolean }) {
  const { data, isLoading } = useLinks(boxId)

  function getFavicon(url: string) {
    const host = new URL(url).hostname
    return `https://icons.duckduckgo.com/ip3/${host}.ico`
  }

  if (isLoading) {
    return (
      <div className="flex flex-col text-center gap-2.5 w-full" >
        <span className="text-sm"> ... </span>
      </div>
    )
  }

  if (data?.length === 0) {
    return (
      <div className="flex flex-col justify-between items-center text-center gap-[30px] w-full max-w-[600px]" >
        <span className="text-sm"> Empty box </span>
        <BsBox className="text-[70px] text-neutral-300" />
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full gap-[15px] justify-center items-center">
      {
        data?.map((link: Link) => (
          <a
            className="bg-white w-full max-w-[600px] p-[15px] flex flex-col gap-5 shadow-sm rounded-md"
            target="_blank"
            rel="noreferrer"
            key={link.id}
            href={link.url}>

            { link.image && !isTiny && <LinkImage link={link} /> }

            <div className="flex flex-col gap-2">
              <div className="flex w-full items-center gap-[15px]">
                {
                  <img
                    className="w-full max-w-5"
                    src={getFavicon(link.url!)}
                    alt="favicon"
                  />
                }
                <h3 className="text-sm wrap-anywhere"> {link.title} </h3>
              </div>

              { link.description && !isTiny &&
                <p className="text-sm text-neutral-500"> {link.description} </p>
              }
              <p className="text-sm text-blue-600 wrap-anywhere"> {link.url} </p>
            </div>
          </a>
        ))
      }
    </div>
  )
}
