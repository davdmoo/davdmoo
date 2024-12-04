import ValidationError from "@/errors/validation.errors"
import { Row } from "@libsql/client"

export default class Path {
  id
  name
  visitCount
  uniqueVisitCount
  createdAt
  updatedAt

  constructor(
    id: number,
    name: string,
    visitCount: number,
    uniqueVisitCount: number,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id
    this.name = name
    this.visitCount = visitCount
    this.uniqueVisitCount = uniqueVisitCount
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static fromDb(row: Row | null | undefined): Path {
    if (row === null || row === undefined) throw new ValidationError("Row is null")

    const id = row["id"] as number
    const name = row["name"] as string
    const visitCount = row["visit_count"] as number
    const uniqueVisitCount = row["unique_visit_count"] as number
    const createdAt = row["created_at"] as string
    const updatedAt = row["updated_at"] as string

    return new Path(id, name, visitCount, uniqueVisitCount, createdAt, updatedAt)
  }
}
