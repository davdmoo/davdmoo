export default function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col text-center w-full">
      <h1 className="text-4xl font-bold">{title}</h1>
      {/* <p>{subtitle}</p> */}

      <hr className="my-4 w-full" />
    </div>
  )
}
