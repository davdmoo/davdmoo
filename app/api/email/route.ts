import EnvError from "@/errors/env.errors"
import ValidationError from "@/errors/validation.errors"

export async function POST(request: Request) {
  try {
    const brevoApiKey = process.env.BREVO_API_KEY
    if (!brevoApiKey) throw new EnvError("BREVO_API_KEY is not defined")

    const formData = await request.formData()
    const { message, visitorId, visitorName } = Object.fromEntries(formData)
    if (!message || !visitorId || !visitorName) throw new ValidationError("Invalid request body")

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      body: JSON.stringify({
        htmlContent: `<html><head></head><body><p>${message}</p></body></html>`,
        subject: "Personal Site",
        sender: {
          name: visitorName,
          email: "david.mulyawan97@gmail.com",
        },
        to: [
          {
            email: "david.mulyawan97@gmail.com",
            name: "David",
          },
        ],
      }),
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "api-key": brevoApiKey,
      },
    })
    const responseJson = await response.json()

    return Response.json({ message: "Success", data: responseJson })
  } catch (err) {
    let errorMessage = "Internal error occurred. Please try again later."
    if (err instanceof Error) {
      errorMessage = err.message
    }

    return Response.json({ message: errorMessage, data: null }, { status: 500 })
  }
}
