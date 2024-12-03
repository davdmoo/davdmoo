"use client"

import ThemeLogic, { ThemeValue } from "@/logics/client/theme.logics"
import { useEffect, useState } from "react"
import MoonIcon from "./moon_icon.components"
import SunlightIcon from "./sunlight_icon.components"

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeValue>(ThemeValue.dark)
  const themeLogic = new ThemeLogic()

  useEffect(() => {
    const currentTheme = themeLogic.getCurrentTheme()
    setTheme(currentTheme)
  }, [])

  return (
    <button
      onClick={() => {
        const currentTheme = themeLogic.getCurrentTheme()
        const newTheme = currentTheme === ThemeValue.light ? ThemeValue.dark : ThemeValue.light

        themeLogic.setCurrentTheme(newTheme)
        setTheme(newTheme)
      }}
      className="bg-transparent border-0 rounded-full p-1"
    >
      {theme === ThemeValue.dark ? <SunlightIcon /> : <MoonIcon />}
    </button>
  )
}
