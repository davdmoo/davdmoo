import ValidationError from "@/errors/validation.errors"
import { Row } from "@libsql/client"

export default class GuestMessage {
  id
  message
  visitorId
  visitorName
  createdAt
  updatedAt

  constructor(
    id: number,
    message: string,
    visitorId: string,
    visitorName: string,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id
    this.message = message
    this.visitorId = visitorId
    this.visitorName = visitorName
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static fromDb(row: Row): GuestMessage {
    if (row.length !== 6 || row === null) throw new ValidationError("Invalid row length")

    const id = row["id"] as number
    const message = row["message"] as string
    const visitorId = row["visitor_id"] as string
    const visitorName = row["visitor_name"] as string
    const createdAt = row["created_at"] as string
    const updatedAt = row["updated_at"] as string

    return new GuestMessage(id, message, visitorId, visitorName, createdAt, updatedAt)
  }
}
