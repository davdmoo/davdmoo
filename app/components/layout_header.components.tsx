import ThemeSwitcher from "./theme_switcher.components"

export default function LayoutHeader() {
  return (
    <header className="flex justify-center pt-4">
      <div className="lg:max-w-2xl md:max-w-2xl flex-1 flex flex-row justify-end">
        <ThemeSwitcher />
      </div>
    </header>
  )
}
