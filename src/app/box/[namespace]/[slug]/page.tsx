import { BoxPageContent } from "@/components/box/box-page-content"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default async function BoxPage( { params }: any ) {
  const { namespace, slug } = await params

  return (
    <div className="flex flex-col w-full min-h-screen justify-between items-center gap-5">
      <Link className="mt-[50px]" href="/">
        <img
          className="w-fuill max-w-[120px] h-auto"
          src="/images/logo.svg"
          alt="logo"
          width={60}
          height={60}
        />
      </Link>

      <BoxPageContent namespace={namespace} slug={slug} />

      <Footer />
    </div>
  )
}
