import getFingerprintLogic from "./get_fingerprint.logics"

export default async function logPageVisit(pathname: string) {
  const fingerprint = await getFingerprintLogic()
  if (fingerprint === null) return

  let sessionId = window.sessionStorage.getItem("session_id")
  if (sessionId === null) {
    sessionId = crypto.randomUUID()
    window.sessionStorage.setItem("session_id", sessionId)
  }

  const body = {
    pathname,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    visitorId: fingerprint,
    sessionId,
  }

  // send analytics using beacon since we don't need to listen to the results
  navigator.sendBeacon("/api/analytics", JSON.stringify(body))
}
