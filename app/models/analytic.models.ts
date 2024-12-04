import ValidationError from "@/errors/validation.errors"
import { Row } from "@libsql/client"

export default class Analytic {
  id
  pathname
  visitorId
  referrer
  userAgent
  timestamp

  constructor(id: number, pathname: string, visitorId: string, referrer: string, userAgent: string, timestamp: string) {
    this.id = id
    this.pathname = pathname
    this.visitorId = visitorId
    this.referrer = referrer
    this.userAgent = userAgent
    this.timestamp = timestamp
  }

  static fromDb(row: Row | null): Analytic {
    if (row === null) throw new ValidationError("Row is null")

    const id = row["id"] as number
    const pathname = row["pathname"] as string
    const visitorId = row["visitor_id"] as string
    const referrer = row["referrer"] as string
    const userAgent = row["user_agent"] as string
    const timestamp = row["timestamp"] as string

    return new Analytic(id, pathname, visitorId, referrer, userAgent, timestamp)
  }
}
