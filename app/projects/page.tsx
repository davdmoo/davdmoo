import Link from "next/link";
import CodeBlock from "../components/code_block.components";

export default function Projects() {
  const htmxCodeSnippet = `
<form hx-get="/dictionaries" hx-target="#response" hx-swap="innerHTML">
  <input type="text" name="word" id="word-input">
  <button type="submit">Search</button>
</form>
  `;
  const hyperscriptCodeSnippet = `
<button _="on click hide #alert"> 
</button>
  `;
  const powerShellCodeSnippet = `
Start-Process –FilePath "$filePath" –Verb Print
  `;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">Projects</h1>
      <p className="text-center">
        A short list of projects and what I think of them in retrospect
      </p>
      <hr className="my-6 w-full" />
      <div className="flex flex-col items-start w-full">
        <h2 className="text-xl mb-2 font-bold">Invoice Management App</h2>
        <div className="text-justify">
          <p className="mb-2">
            This was a Windows application I built using Flutter and Typescript.
            Features include authentication, sales and product shipments&apos;
            invoice generation, along with sales data, customer, product, and
            stock management, and automated monthly reports.
          </p>
          <p className="mb-2">
            The most challenging part of this one was that this was my first
            experience handling a freelance project. I had to consult directly
            with the client, mapping business into project requirements,
            managing project timelines, and programming the actual software.
          </p>
          <p className="mb-2">
            Fortunately, I have experience in managing and splitting tasks at
            work using GitHub Projects (although there was no requirement to do
            so). This I did since I had found myself being constantly
            overwhelmed by unclear requirements and tasks.
          </p>
          <p className="mb-2">
            The second most challenging part was printing hard copied invoices
            using dot matrix printers - of which I had no experience doing. In
            the end, what I did was generating the invoice as HTML on the
            server, converting it into PDF, and then sending a PowerShell
            command to print using the default PDF reader.
          </p>
          <p className="mb-2">
            All in all, I learned a lot in managing project timelines, creating
            and managing database backups, re-learned database migrations, and,
            of course, time management, since I had to work on the project
            outside of working hours.
          </p>

          <CodeBlock
            codeSnippet={powerShellCodeSnippet}
            language="PowerShell"
          />
        </div>

        <hr className="my-6 w-full" />

        <h2 className="text-xl mb-2 font-bold">
          <Link
            href="https://slinks.deno.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Slinks <span>↗</span>
          </Link>
        </h2>
        <Link
          href="https://github.com/davdmoo/slinks"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4"
        >
          <em>Code base</em> <span>↗</span>
        </Link>
        <p className="mb-2">
          A fun and simple way for me to explore the{" "}
          <Link
            href="https://deno.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deno <span>↗</span>
          </Link>{" "}
          runtime,{" "}
          <Link
            href="https://htmx.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            HTMX <span>↗</span>
          </Link>, and{" "}
          <Link
            href="https://hyperscript.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hyperscript <span>↗</span>
          </Link>. Features include creating short links, downloading URL as QR
          code, and light/dark modes.
        </p>
        <p className="mb-2">
          Deno is a JS runtime which has the tagline &quot;Uncomplicate
          JavaScript&quot;. And I think it did just that - at least in my simple
          project. Not having to deal with configuring code formatters, linters,
          and having a relatively concise code base was very nice!
        </p>
        <p className="mb-2">
          HTMX is a different take on what I am used to seeing/building in terms
          of clients and servers&apos; interactions. I learned about how REST
          was originally designed to{" "}
          <Link
            href="https://https://htmx.org/essays/how-did-rest-come-to-mean-the-opposite-of-rest/"
            target="_blank"
            rel="noopener noreferrer"
          >
            work <span>↗</span>
          </Link>, re-learned HTML forms, and how HTML responses are actually
          {" "}
          <Link
            href="https://htmx.org/essays/hypermedia-apis-vs-data-apis/"
            target="_blank"
            rel="noopener noreferrer"
          >
            self-documenting <span>↗</span>
          </Link>{" "}
          codes.
        </p>
        <p>
          HTMX creator&apos;s{" "}
          <Link
            href="https://htmx.org/essays"
            target="_blank"
            rel="noopener noreferrer"
          >
            essays
          </Link>{" "}
          is a great source of tech reads. Especially his essay on{" "}
          <Link
            href="https://grugbrain.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            simplicity <span>↗</span>
          </Link>.
        </p>

        <CodeBlock
          codeSnippet={hyperscriptCodeSnippet}
          language="//hyperscript"
        />

        <hr className="my-6 w-full" />

        <h2 className="text-xl mb-2 font-bold">
          <Link
            href="https://dictionary-htmx.deno.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dictionary <span>↗</span>
          </Link>
        </h2>
        <Link
          href="https://github.com/davdmoo/dictionary"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4"
        >
          <em>Code base</em> <span>↗</span>
        </Link>
        <p>
          I find myself in constant needs of finding word definitions and wanted
          a simple way to do so (can always Google but that&apos;s no fun, plus
          this was an excuse to explore HTMX again). Features include
          integration with third party{" "}
          <Link
            href="https://dictionaryapi.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4"
          >
            API <span>↗</span>
          </Link>{" "}
          and managing audio playback using vanilla Javascript.
        </p>

        <CodeBlock codeSnippet={htmxCodeSnippet} language="htmx" />

        <hr className="mt-6 w-full" />
      </div>
    </div>
  );
}
