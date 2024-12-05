import Path from "@/app/models/path.models"
import NotFoundError from "@/errors/not_found.errors"
import ValidationError from "@/errors/validation.errors"
import database from "@/utils/database"
import { Transaction } from "@libsql/client"

export async function POST(request: Request) {
  let transaction: Transaction | undefined

  try {
    const json = await request.json()
    const { pathname, referrer, userAgent, visitorId } = json
    if (!pathname || referrer === undefined || !userAgent || !visitorId) {
      throw new ValidationError("Invalid request body")
    }

    const db = database()
    transaction = await db.transaction("write")
    const pathQuery = await transaction.execute({
      sql: `select * from path where name = ? limit 1`,
      args: [pathname],
    })
    const pathRow = pathQuery.rows.at(0)
    if (!pathRow) throw new NotFoundError("Path not found")

    const path = Path.fromDb(pathRow)

    // check if current visitor is unique
    const uniqueAnalyticQuery = await transaction.execute({
      sql: `select * from analytic where path_id = ? and visitor_id = ? limit 1`,
      args: [path.id, visitorId],
    })
    const uniqueAnalyticRow = uniqueAnalyticQuery.rows.at(0)

    let uniqueVisitCount = path.uniqueVisitCount
    if (!uniqueAnalyticRow) {
      uniqueVisitCount = path.uniqueVisitCount + 1
    }

    // update path's visit count and create new analytic data
    await transaction.batch([
      {
        sql: `insert into analytic(path_id, referrer, user_agent, visitor_id) values(?, ?, ?, ?)`,
        args: [path.id, referrer, userAgent, visitorId],
      },
      {
        sql: `update path set visit_count = ?, unique_visit_count = ? where id = ?`,
        args: [path.visitCount + 1, uniqueVisitCount, path.id],
      },
    ])

    await transaction.commit()
    return Response.json({ message: "Success", data: null }, { status: 201 })
  } catch (err) {
    await transaction?.rollback()

    let errorMessage = "Internal error occurred. Please try again later."
    if (err instanceof Error) {
      console.error(err.stack)
      errorMessage = err.message
    }

    return Response.json({ message: errorMessage, data: null }, { status: 500 })
  }
}

// export async function GET() {
//   try {
//     const db = database()
//     const queryResult = await db.execute({
//       sql: `select * from analytic`,
//       args: [],
//     })

//     return Response.json({ message: "Success", data: queryResult.rows.map((row) => Analytic.fromDb(row)) })
//   } catch (err) {
//     let errorMessage = "Internal error occurred. Please try again later."
//     if (err instanceof Error) {
//       errorMessage = err.message
//     }

//     return Response.json({ message: errorMessage, data: null }, { status: 500 })
//   }
// }
