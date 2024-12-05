import getFingerprintLogic from "./get_fingerprint.logics"

export default async function logPageVisit(pathname: string) {
  let fingerprint = localStorage.getItem("fingerprint")
  if (fingerprint === null) {
    const freshFingerprint = await getFingerprintLogic()
    if (freshFingerprint === null) return

    fingerprint = freshFingerprint
  }

  const body = {
    pathname,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    visitorId: fingerprint,
  }

  // send analytics using beacon since we don't need to listen to the results
  navigator.sendBeacon("/api/analytics", JSON.stringify(body))
}
