import { Row } from "@libsql/client"

export default class AnalyticSession {
  id
  visitorId
  sessionStart
  sessionEnd

  constructor(id: number, visitorId: string, sessionStart: string, sessionEnd: string) {
    this.id = id
    this.visitorId = visitorId
    this.sessionStart = sessionStart
    this.sessionEnd = sessionEnd
  }

  static fromDb(row: Row) {
    const { id, visitorId, sessionStart, sessionEnd } = row
    return new AnalyticSession(id as number, visitorId as string, sessionStart as string, sessionEnd as string)
  }
}
