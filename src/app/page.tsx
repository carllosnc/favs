import Image from "next/image"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Header session={session} />

      <div className="w-full px-6 flex flex-col gap-10 items-center justify-center">
        <Image
          className="w-fuill max-w-[120px] h-auto"
          src="/images/logo.svg"
          alt="logo"
          width={200}
          height={200}
        />

        <h1 className="md:text-[30px] md:leading-[35px] text-center font-medium text-[50px] w-full max-w-[700px]">
          The better place to your favorite links
        </h1>

        <p className="text-center text-neutral-500 w-full text-[20px] md:text-[18px] md:text-md max-w-[600px]">
          Favs is a sleek, intuitive platform designed to help you
          effortlessly organize, manage, and share your favorite links.
        </p>
      </div>

      <Footer />
    </main>
  )
}