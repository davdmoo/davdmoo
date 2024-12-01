import EnvError from "@/errors/env.errors"
import { Client, createClient } from "@libsql/client"

export default function database(): Client {
  const url = process.env.TURSO_DATABASE_URL
  if (!url) throw new EnvError("TURSO_DATABASE_URL is not defined")

  return createClient({
    // url: "file:local.db",
    url: url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
}
