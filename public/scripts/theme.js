function themeInit() {
  const theme = localStorage.getItem('theme')
  if (theme === null) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const activeTheme = prefersDark ? "dark" : "light"

    // set the theme
    localStorage.setItem("theme", activeTheme)
  }

  document.documentElement.classList.toggle("dark", localStorage.getItem("theme") === "dark")
}

themeInit()
