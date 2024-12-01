"use client"

import ValidationError from "@/errors/validation.errors"
import getFingerprintLogic from "@/logics/client/get_fingerprint.logics"
import getGuestMessages from "@/logics/client/get_guest_messages.logics"
import { FormEvent, useEffect, useState } from "react"
import PageHeader from "../components/page_header.components"
import GuestMessage from "../models/guest_message.models"

export default function GuestBookPage() {
  // form data
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [visitorId, setVisitorId] = useState("")

  const [formDisabled, setFormDisabled] = useState(true)
  const [messages, setMessages] = useState<GuestMessage[]>([])
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // get browser fingerprint on page's first load and only enable the form if getting fp is successful
    getFingerprintLogic().then((fp) => {
      if (fp === null) return

      setVisitorId(fp)
      setFormDisabled(false)
    })

    // get all guest messages data on first load
    getGuestMessages()
      .then((data) => {
        setMessages(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      setIsSaving(true)

      const response = await submit(message, visitorId, name)
      if (response.status !== 201) {
        const jsonResponse = await response.json()
        throw new Error(jsonResponse.message ?? "Couldn't process your request")
      }

      // clear the form
      setMessage("")
      setName("")

      // get the latest messages
      const updatedMessages = await getGuestMessages()
      setMessages(updatedMessages)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col">
      <PageHeader title="/guest-book" subtitle="Leave a message!" />

      <form action="/api/guest-messages" method="post" onSubmit={submitForm} className="flex flex-col mb-6">
        <label htmlFor="text" className="mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          disabled={formDisabled || isSaving}
          className="mb-4 rounded-sm p-1.5"
          required={true}
          maxLength={50}
        />
        <label htmlFor="text" className="mb-1">
          Message
        </label>
        <input
          type="text"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Message"
          disabled={formDisabled || isSaving}
          className="rounded-sm p-1.5 mb-4"
          required={true}
          maxLength={50}
        />
        <button type="submit" disabled={formDisabled || isSaving} className="p-3 bg-white rounded-md">
          Submit
        </button>
      </form>

      <hr className="my-6 w-full" />

      <h2 className="mb-3">Messages</h2>
      {messages.map((msg) => (
        <div key={msg.id} className="flex flex-row">
          <p className="mr-2 font-semibold text-sm">{msg.visitorName}:</p>
          <p className="text-sm"> {msg.message}</p>
        </div>
      ))}
    </div>
  )
}

async function submit(message: string, visitorId: string | null, name: string): Promise<Response> {
  if (visitorId == null) {
    throw new ValidationError("Couldn't get browser fingerprint")
  }

  const formData = new FormData()
  formData.append("message", message)
  formData.append("visitorId", visitorId)
  formData.append("visitorName", name)

  const response = await fetch("/api/guest-messages", {
    body: formData,
    method: "POST",
  })
  return response
}
