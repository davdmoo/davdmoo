"use client"

import { MessageType } from "@/enums/message_type.enums"
import ValidationError from "@/errors/validation.errors"
import getFingerprintLogic from "@/logics/client/get_fingerprint.logics"
import getGuestMessages from "@/logics/client/get_guest_messages.logics"
import { FormEvent, RefObject, useEffect, useRef, useState } from "react"
import PageHeader from "../components/page_header.components"
import GuestMessage from "../models/guest_message.models"

export default function GuestBookPage() {
  // form data
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [visitorId, setVisitorId] = useState("")
  const [messageType, setMessageType] = useState<MessageType>(MessageType.public)

  const [formDisabled, setFormDisabled] = useState(true)
  const [messages, setMessages] = useState<GuestMessage[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)

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

      const response = await submit(message, visitorId, name, messageType)
      if (response.status !== 201) {
        const jsonResponse = await response.json()
        throw new Error(jsonResponse.message ?? "Couldn't process your request")
      }

      // clear the form
      setMessage("")
      setName("")
      setMessageType(MessageType.public)

      showDialog(dialog)

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
      <PageHeader title="/guest-book" />

      <form action="/api/guest-messages" method="post" onSubmit={submitForm} className="flex flex-col mb-2">
        <label htmlFor="name" className="mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          disabled={formDisabled || isSaving}
          className="mb-4 rounded-md p-2"
          required={true}
          maxLength={50}
        />

        <label htmlFor="message" className="mb-1">
          Message
        </label>
        <input
          id="message"
          type="text"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Message"
          disabled={formDisabled || isSaving}
          className="rounded-md p-2 mb-4"
          required={true}
          maxLength={50}
        />

        <div
          className="flex-1 flex items-center space-x-2 mb-4"
          title="Your message will be sent via email instead of being shown below"
        >
          <input
            type="checkbox"
            name="type"
            id={MessageType.private}
            value={MessageType.private}
            checked={messageType === MessageType.private}
            onChange={(event) => {
              let type = event.target.value as MessageType

              // check the current selected type and toggle it
              if (messageType === MessageType.private) {
                type = MessageType.public
              }

              return setMessageType(type)
            }}
            className="hover:cursor-pointer"
          />
          <label htmlFor={MessageType.private} className="hover: cursor-pointer">
            Private message
          </label>
        </div>

        <button type="submit" disabled={formDisabled || isSaving} className="p-3 rounded-md font-semibold">
          Submit
        </button>
      </form>

      <dialog ref={dialog}>
        <div className="flex flex-col items-end">
          <h2>Your message has been sent!</h2>
          <button
            onClick={() => closeDialog(dialog)}
            className="mt-2 p-2 bg-transparent border-0 rounded-md text-foreground text-sm lg:text-base md:text-base"
          >
            Close
          </button>
        </div>
      </dialog>

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

async function submit(message: string, visitorId: string | null, name: string, type: MessageType): Promise<Response> {
  if (visitorId == null) {
    throw new ValidationError("Couldn't get browser fingerprint")
  }

  const form = new URLSearchParams()
  form.append("message", message)
  form.append("visitorId", visitorId)
  form.append("visitorName", name)
  form.append("type", type)

  const response = await fetch("/api/guest-messages", {
    body: form,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
  return response
}

function closeDialog(dialog: RefObject<HTMLDialogElement>) {
  dialog.current?.close()
}

function showDialog(dialog: RefObject<HTMLDialogElement>) {
  dialog.current?.showModal()
}
