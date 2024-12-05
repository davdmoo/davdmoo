"use client"

import logPageVisit from "@/logics/client/log_page_visit.logics"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    logPageVisit(pathname)

    // set session_id
    const currentSession = window.sessionStorage.getItem("session_id")
    if (currentSession === null) {
      const uuid = crypto.randomUUID()
      window.sessionStorage.setItem("session_id", uuid)
    }

    window?.addEventListener("close", () => {
      // TODO: log event
    })
  }, [pathname])

  return null
}
