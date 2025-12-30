"use client"

import { Link } from "@/types/db-types"
import { useEffect, useState } from "react"
import { BsBox } from "react-icons/bs";
import { EmptyBox } from "../empty-box";

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
      className="w-full"
      src={link.image!}
      alt={link.title!}
    />
  )
}

export function BoxLinks({ isTiny, links }: { isTiny: boolean, links: Link[] }) {

  function getFavicon(url: string) {
    const host = new URL(url).hostname
    return `https://icons.duckduckgo.com/ip3/${host}.ico`
  }

  if (links?.length === 0) {
    return <div> <EmptyBox /> </div>
  }

  return (
    <div className="flex flex-col w-full gap-[15px] justify-center items-center">
      {
        links?.map((link: Link) => (
          <a
            className="bg-white w-full max-w-[600px] p-[15px] flex flex-col gap-5 shadow-sm rounded-md border border-white hover:border-blue-500 transition-all"
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
                <h3 className="text-sm wrap-anywhere md:truncate"> {link.title} </h3>
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
