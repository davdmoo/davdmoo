import AnalyticSession from "@/app/models/analytic_session.models"
import ValidationError from "@/errors/validation.errors"
import database from "@/utils/database"
import * as Sentry from "@sentry/nextjs"

export async function POST(request: Request) {
  try {
    const { sessionId, visitorId } = await request.json()
    if (!sessionId || !visitorId) throw new ValidationError("Invalid request body")

    const db = database()
    const newSessionQuery = await db.execute({
      sql: "insert or replace into session (id, visitor_id) values (?, ?)",
      args: [sessionId, visitorId],
    })

    return Response.json(
      { message: "Success", data: AnalyticSession.fromDb(newSessionQuery.rows.at(0)!) },
      { status: 201 }
    )
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      Sentry.captureException(err)
    }

    let errorMessage = "Internal error occurred. Please try again later."
    if (err instanceof Error) {
      console.error(err.stack)
      errorMessage = err.message
    }

    return Response.json({ message: errorMessage, data: null }, { status: 500 })
  }
}
