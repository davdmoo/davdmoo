import Link from "next/link";

export default function Home() {
  const firstProExp = new Date("2022-02-14");

  return (
    <div className="text-justify">
      <h1 className="mb-4 font-bold">Hi.</h1>
      <h2 className="mb-3 font-bold">My name is David.</h2>
      <p className="mb-2">
        I am a software developer with {`${getExp(firstProExp)}`}{" "}
        of professional{" "}
        <Link href="/experience">experience</Link>. I started programming in
        September 2021 - when I learned Javascript by joining a coding bootcamp
        online.
      </p>
      <p className="mb-2">
        Currently I am a full stack developer at{" "}
        <Link
          href="https://qios-id.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Qios <span>↗</span>
        </Link>{" "}
        - a company focused in delivering self-service systems for the FnB,
        transportation, and service industries. At work, I mostly program using
        Flutter and Typescript.
      </p>
      <p className="mb-2">
        I am currently re-learning and exploring the web world - this website
        being one such example.
      </p>
      <p className="mb-2">
        Outside of work, I enjoy programming for{" "}
        <Link href="/projects">fun</Link>, playing Dota 2, reading sci-fi books
        (<Link
          href="https://www.goodreads.com/book/show/20518872-the-three-body-problem"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Three-Body Problem <span>↗</span>
        </Link>{" "}
        series was a mind boggling experience), and watching coming of age
        movies. I also listen to all kinds of music, although I lean towards
        metal and anything with catchy guitar riffs. To quote some stranger from
        the internet; <em>If it slaps, it slaps</em>.
      </p>
    </div>
  );
}

function getExp(start: Date) {
  const diff = new Date().getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const oneMonth = oneDay * 30;
  const oneYear = oneMonth * 12;

  const yoe = Math.floor(diff / oneYear);
  const moe = Math.floor(diff / oneMonth) - (yoe * 12);

  let result = `${yoe} years and ${moe} month`;
  if (moe > 1) result += "s";

  return result;
}
