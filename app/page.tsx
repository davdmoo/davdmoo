import Link from "next/link"
import PageHeader from "./components/page_header.components"

export default function Home() {
  const firstProExp = new Date("2022-02-14")

  return (
    <div className="text-justify">
      <PageHeader title="/" />

      <h2>About</h2>
      <p>
        Hello. My name is David, a software developer with {`${getExp(firstProExp)}`} of professional{" "}
        <Link href="/experience">experience</Link>. I specialize in building softwares using Flutter, React, and
        Typescript.
      </p>
      <p>
        I have always had curiosity toward all things computer related. I used to tinker with my PC; breaking them apart
        and putting them back together, messing around with Windows, and at some point, Linux installations, even
        becoming a source for my friends to ask their PC problems with.
      </p>
      <p>
        That hands-on curiosity made me decide to try to have a career in programming by getting into{" "}
        <Link href="https://hacktiv8.com" target="_blank" rel="noopener noreferrer">
          Hacktiv8&apos;s
        </Link>{" "}
        full stack Javascript bootcamp. I chose this particular platform since they have an income share agreement
        program, allowing me to pay for myself after my study is complete.
      </p>

      <hr className="my-6 w-full" />

      <h2>Career Journey</h2>
      <p>
        My professional experience started at{" "}
        <Link href="https://qios-id.com" target="_blank" rel="noopener noreferrer">
          Qios
        </Link>
        , where I became one of the first two programmers in the company. It was quite the challenge, but I believe it
        allowed me to develop unique set of skills and taking full ownership of several impactful projects.
      </p>
      <p>
        One of my proudest achievements was developing a self-service bus ticketing platform that processes up to 90,000
        transactions per month. This was my first professional project and also the first one using Flutter; a tool I
        had to learn during my first month here.
      </p>
      <p>
        Some exciting features I worked on during this project were QRIS and EDC payment integration, communicating with
        the device&apos;s printing hardware using Java and AIDL, and creating a (rather) simple error tracking/debugging
        tool using Firestore and Crashlytics.
      </p>

      <hr className="my-6 w-full" />

      <h2>Outside of Work</h2>
      <p>
        I enjoy programming for <Link href="/projects">fun</Link>, playing Dota 2, reading sci-fi books (
        <Link
          href="https://www.goodreads.com/book/show/20518872-the-three-body-problem"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Three-Body Problem
        </Link>{" "}
        series was a mind boggling experience), and watching coming of age movies. I also listen to all kinds of music,
        although I lean towards metal and anything with catchy guitar riffs. To quote some stranger from the internet;{" "}
        <em>If it slaps, it slaps</em>.
      </p>
    </div>
  )
}

function getExp(start: Date) {
  const diff = new Date().getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  const oneMonth = oneDay * 30
  const oneYear = oneMonth * 12

  const yoe = Math.floor(diff / oneYear)
  const moe = Math.floor(diff / oneMonth) - yoe * 12

  let result = `${yoe} years and ${moe} month`
  if (moe > 1) result += "s"

  return result
}
