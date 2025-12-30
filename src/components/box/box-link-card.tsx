import { Link } from "@/types/db-types"
import { useEffect, useState } from "react"

type Props = {
  link: Link
  isTiny: boolean
}

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

export function BoxLinkCard({ link, isTiny }: Props) {
  function getFavicon(url: string) {
    const host = new URL(url).hostname
    return `https://icons.duckduckgo.com/ip3/${host}.ico`
  }

  function isYoutube(link: Link) {
    const host = new URL(link.url!).hostname
    return host === 'www.youtube.com' || host === 'youtube.com'
  }

  if(isYoutube(link)){
    const url = new URL(link.url!)
    const videoId = url.searchParams.get('v')
    const embedUrl = `https://www.youtube.com/embed/${videoId}`

    return (
      <iframe
        className="w-full max-w-[600px] rounded-md bg-white p-[15px] shadow-sm aspect-video"
        width="560"
        height="315"
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    )
  }

  return (
    <a
      className="bg-white w-full max-w-[600px] p-[15px] flex flex-col gap-5 shadow-sm rounded-md border border-white hover:border-blue-500 transition-all"
      rel="noreferrer"
      key={link.id}
      href={link.url}
    >

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
  )
}