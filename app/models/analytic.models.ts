import { Row } from "@libsql/client"

export default class Analytic {
  id
  pathId
  browserId
  osId
  deviceId
  visitorId
  referrer
  userAgent
  timestamp

  constructor(
    id: number,
    pathId: number,
    browserId: number,
    osId: number,
    deviceId: number,
    visitorId: string,
    referrer: string,
    userAgent: string,
    timestamp: string
  ) {
    this.id = id
    this.pathId = pathId
    this.browserId = browserId
    this.osId = osId
    this.deviceId = deviceId
    this.visitorId = visitorId
    this.referrer = referrer
    this.userAgent = userAgent
    this.timestamp = timestamp
  }

  static fromDb(row: Row | null | undefined) {
    if (!row) return null

    const id = row["id"] as number
    const pathId = row["path_id"] as number
    const browserId = row["browser_id"] as number
    const osId = row["os_id"] as number
    const deviceId = row["device_id"] as number
    const visitorId = row["visitor_id"] as string
    const referrer = row["referrer"] as string
    const userAgent = row["user_agent"] as string
    const timestamp = row["timestamp"] as string

    return new Analytic(id, pathId, browserId, osId, deviceId, visitorId, referrer, userAgent, timestamp)
  }
}
