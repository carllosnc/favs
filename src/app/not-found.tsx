import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col  items-center justify-center w-full h-screen">
      <span className="text-neutral-400 font-extralight text-[150px]"> 404 </span>
      <div className="flex flex-col gap-5">
        <span className="text-neutral-500 text-center text-xl">
          Page not found
        </span>
        <Link href="/" className="text-center text-blue-600 text-sm">
          <Button variant="outline"> ← Go back home </Button>
        </Link>
      </div>
    </div>
  )
}
