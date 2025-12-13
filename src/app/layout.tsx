import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/components/react-query-provider";
import { Toaster } from "@/components/ui/sonner";

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
  title: "FAVS",
  description: "Your favourite links",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.className} ${geistMono.className} antialiased bg-neutral-100`}
      >
        <div className="w-full m-auto max-w-[800px] border-x border-neutral-300 min-h-screen flex flex-col justify-between items-center lg:border-transparent px-5">
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </div>

        <Toaster />
      </body>
    </html>
  );
}
