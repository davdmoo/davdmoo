import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "/davdmoo",
  description: "Personal site built using Next.js and Tailwind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col items-center`}
      >
        <main className="lg:max-w-2xl py-6 w-full flex-1 flex flex-col justify-center px-6">
          {children}
        </main>

        <footer className="py-4 px-2 space-x-6">
          <Link href="/">/</Link>
          <Link href="/experience">/experience</Link>
          <Link href="/projects">/projects</Link>
          <Link href="/guest-book">/guests</Link>
        </footer>
      </body>
    </html>
  );
}
