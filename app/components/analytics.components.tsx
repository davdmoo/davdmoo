"use client"

import logPageVisit from "@/logics/client/log_page_visit.logics"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    logPageVisit(pathname)

    window?.addEventListener("close", () => {
      // TODO: log event
    })
  }, [pathname])

  return null
}
