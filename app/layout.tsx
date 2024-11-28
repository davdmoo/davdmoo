import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "David Mulyawan",
  description: "My personal site",
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

        <main className="max-w-2xl py-6 w-full flex-1 flex flex-col justify-center px-6">
          {children}
        </main>

        <footer className="flex space-x-6 py-6">
          <a href="/">/home</a>
          <a href="/experience">/experience</a>
          <a href="/projects">/projects</a>
        </footer>
      </body>
    </html>
  );
}
