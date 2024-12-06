import { getFingerprint } from "@thumbmarkjs/thumbmarkjs"

export default async function getFingerprintLogic() {
  let fingerprint = localStorage.getItem("fingerprint")

  if (!fingerprint) {
    try {
      fingerprint = await getFingerprint()
      localStorage.setItem("fingerprint", fingerprint)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return null
    }
  }

  return fingerprint
}
