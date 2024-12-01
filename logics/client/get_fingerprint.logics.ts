import { getFingerprint } from "@thumbmarkjs/thumbmarkjs"

export default async function getFingerprintLogic() {
  const cached = localStorage.getItem("fingerprint")

  if (!cached) {
    try {
      const fingerprint = await getFingerprint()
      localStorage.setItem("fingerprint", fingerprint)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return null
    }
  }

  return localStorage.getItem("fingerprint")
}
