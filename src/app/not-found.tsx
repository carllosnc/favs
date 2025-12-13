import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image"

export default function NotFoundPage() {
  return (
    <div className="flex flex-col  items-center justify-center w-full h-screen">

      <Image
        className="w-fuill max-w-20 h-auto"
        src="/images/logo.svg"
        alt="logo"
        width={200}
        height={200}
      />

      <span className="text-neutral-400 font-extralight text-[150px]"> 404 </span>
      <div className="flex flex-col gap-5">
        <span className="text-neutral-500 text-center text-xl">
          Page not found
        </span>
        <Link href="/" className="text-center text-blue-600 text-sm">
          <Button variant="outline" size="sm"> ← back to home </Button>
        </Link>
      </div>
    </div>
  )
}
