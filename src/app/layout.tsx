import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/components/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
import { Session } from "@/types/session"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { Button } from "@/components/ui/button"
import { MdOutlineSpaceDashboard } from "react-icons/md";
import Link from "next/link";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
        <div className="w-full m-auto max-w-[800px] border-x border-neutral-300 min-h-screen flex flex-col justify-between items-center lg:border-transparent px-2.5">
            <ReactQueryProvider>
              {children}
            </ReactQueryProvider>
        </div>

          { session &&
            <Link href={`/dashboard/`} className="fixed bottom-5 right-5 leading-5">
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
