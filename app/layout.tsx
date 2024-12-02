import type { Metadata } from "next"
import localFont from "next/font/local"
import Link from "next/link"
import "./globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "/davdmoo",
  description: "Personal site built using Next.js and Tailwind",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col justify-between px-4`}
      >
        <main className="flex-grow flex flex-col items-center py-12">
          <div className="lg:max-w-2xl md:max-w-2xl w-full">{children}</div>
        </main>

        <footer className="flex justify-center py-6 px-2 space-x-6">
          <Link className="text-anchor-alt visited:text-anchor-visited-alt" href="/">
            /
          </Link>
          <Link className="text-anchor-alt visited:text-anchor-visited-alt" href="/experience">
            /experience
          </Link>
          <Link className="text-anchor-alt visited:text-anchor-visited-alt" href="/projects">
            /projects
          </Link>
          <Link className="text-anchor-alt visited:text-anchor-visited-alt" href="/guest-book">
            /guests
          </Link>
        </footer>
      </body>
    </html>
  )
}
