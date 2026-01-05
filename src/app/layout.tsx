import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/components/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
import { Session } from "@/types/session"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { Button } from "@/components/ui/button"
import { MdOutlineSpaceDashboard } from "react-icons/md";
import Link from "next/link";
import { SessionProvider } from "@/context/session-context";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "FAVS - Your favourite links",
  description: "The better place to your favorite links",
  openGraph: {
    title: "FAVS - Your favourite links",
    description: "The better place to your favorite links",
    url: "https://favs.vercel.app",
    siteName: "FAVS",
    images: [
      {
        url: "https://favs.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "FAVS - Your favourite links",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAVS - Your favourite links",
    description: "The better place to your favorite links",
    images: ["https://favs.vercel.app/og.png"],
    creator: "@carlosnosta",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session: Session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <html lang="en">
      <body
        className={`${interSans.className} ${geistMono.className} antialiased bg-neutral-100`}
      >
        <div className="border-x border-neutral-200 w-full m-auto max-w-[800px] min-h-screen flex flex-col justify-between items-center lg:border-transparent px-2.5">
          <ReactQueryProvider>
            <SessionProvider session={session}>
              {children}
            </SessionProvider>
          </ReactQueryProvider>
        </div>

        {
          session &&
          <Link href={`/dashboard/`} className="fixed bottom-[50px] right-5 leading-5">
            <Button size="icon-lg" className="cursor-pointer">
              <MdOutlineSpaceDashboard />
            </Button>
          </Link>
        }

        <Toaster />
      </body>
    </html>
  );
}
