import GuestMessage from "@/app/models/guest_message.models";
import ValidationError from "@/errors/validation.errors";
import database from "@/utils/database";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const { message, visitorId, visitorName } = Object.fromEntries(formData);
    if (!message || !visitorId || !visitorName) throw new ValidationError("Invalid request body");

    const db = database();
    const queryResult = await db.execute({
      sql: `insert into guest_message(message, visitor_id, visitor_name) values(?, ?, ?) returning *`,
      args: [message.toString(), visitorId.toString(), visitorName.toString()],
    });
    const row = queryResult.rows.at(0);
    if (row === undefined) {
      throw new Error("Failed creating new message");
    }

    const response = GuestMessage.fromDb(row);
    return Response.json({ message: "Success", data: response }, { status: 201 });
  } catch (err) {
    let errorMessage = "Internal error occurred. Please try again later.";
    let status = 500;
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    if (err instanceof ValidationError) {
      status = 400;
    }

    return Response.json({ message: errorMessage, data: null }, { status: status });
  }
}

export async function GET() {
  try {
    const db = database();
    const queryResult = await db.execute("select * from guest_message");

    const guestMessages = queryResult.rows.map((row) => GuestMessage.fromDb(row));
    guestMessages.sort((a, b) => b.id - a.id);
    return Response.json({ message: "Success", data: guestMessages });
  } catch (err) {
    let errorMessage = "Internal error occurred. Please try again later.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    return Response.json({ message: errorMessage, data: null }, { status: 500 });
  }
}
