export default function CodeBlock({ codeSnippet, language }: { codeSnippet: string; language: string }) {
  return (
    <div className="mt-6 mb-2 text-sm rounded-md w-full">
      <p className="rounded-t-md px-3 py-1 mb-0" style={{ color: "#1F1F28", backgroundColor: "#957FB8" }}>
        {language}
      </p>
      <pre className="px-6 rounded-b-md whitespace-pre-wrap break-all">
        <code className="block w-full">{codeSnippet}</code>
      </pre>
    </div>
  )
}
