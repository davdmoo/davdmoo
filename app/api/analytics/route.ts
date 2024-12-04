import Analytic from "@/app/models/analytic.models"
import ValidationError from "@/errors/validation.errors"
import database from "@/utils/database"

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const { pathname, referrer, userAgent, visitorId } = json
    if (!pathname || referrer === undefined || !userAgent || !visitorId) {
      throw new ValidationError("Invalid request body")
    }

    const db = database()
    const queryResult = await db.execute({
      sql: `insert into analytics(pathname, referrer, user_agent, visitor_id) values(?, ?, ?, ?) returning *`,
      args: [pathname, referrer, userAgent, visitorId],
    })
    const row = queryResult.rows.at(0)
    if (row === undefined) {
      throw new Error("Failed creating new analytics")
    }

    return Response.json({ message: "Success", data: Analytic.fromDb(row) }, { status: 201 })
  } catch (err) {
    let errorMessage = "Internal error occurred. Please try again later."
    if (err instanceof Error) {
      errorMessage = err.message
    }

    return Response.json({ message: errorMessage, data: null }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const db = database()
    const queryResult = await db.execute({
      sql: `select * from analytics`,
      args: [],
    })

    return Response.json({ message: "Success", data: queryResult.rows.map((row) => Analytic.fromDb(row)) })
  } catch (err) {
    let errorMessage = "Internal error occurred. Please try again later."
    if (err instanceof Error) {
      errorMessage = err.message
    }

    return Response.json({ message: errorMessage, data: null }, { status: 500 })
  }
}
