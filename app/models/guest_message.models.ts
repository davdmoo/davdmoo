import DataTypeError from "@/errors/data_type.errors"
import ValidationError from "@/errors/validation.errors"
import { Row } from "@libsql/client"

export default class GuestMessage {
  id
  message
  visitorId
  visitorName

  constructor(id: number, message: string, visitorId: string, visitorName: string) {
    this.id = id
    this.message = message
    this.visitorId = visitorId
    this.visitorName = visitorName
  }

  static fromDb(row: Row): GuestMessage {
    if (row.length !== 4 || row === null) throw new ValidationError("Invalid row length")

    const id = row["id"]
    const message = row["message"]
    const visitorId = row["visitor_id"]
    const visitorName = row["visitor_name"]

    if (typeof id !== "number") {
      throw new DataTypeError(`ID (${id}) must be of type number`)
    }

    if (typeof message !== "string") {
      throw new DataTypeError(`Message (${message}) must be of type string`)
    }

    if (typeof visitorId !== "string") {
      throw new DataTypeError(`Visitor ID (${visitorId}) must be of type string`)
    }

    if (typeof visitorName !== "string") {
      throw new DataTypeError(`Visitor ID (${visitorName}) must be of type string`)
    }

    return new GuestMessage(id, message, visitorId, visitorName)
  }
}
