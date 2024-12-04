"use client"

import DownloadIcon from "./download_icon.components"
import TextButton from "./text_button.components"

export default function DownloadCvButton() {
  return (
    <TextButton
      onClick={() => {
        window.open("/resume.pdf", "_blank")?.focus()
      }}
    >
      <DownloadIcon />
      <p className="mb-0">Resume</p>
    </TextButton>
  )
}
