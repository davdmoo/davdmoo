export enum ThemeValue {
  light = "light",
  dark = "dark",
}

let instance: ThemeLogic | undefined

export default class ThemeLogic {
  getCurrentTheme(): ThemeValue {
    const theme = localStorage.getItem("theme")
    if (theme === null) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const preferredTheme = prefersDark ? ThemeValue.dark : ThemeValue.light

      this.setCurrentTheme(preferredTheme)
      return preferredTheme
    }

    return theme as ThemeValue
  }

  setCurrentTheme(value: ThemeValue) {
    localStorage.setItem("theme", value)
    document.documentElement.classList.toggle(ThemeValue.dark)
  }

  contructor() {
    if (!instance) {
      instance = this
    }

    return instance
  }
}
