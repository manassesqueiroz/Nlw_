'use client'

import { ChangeEvent, useState } from 'react'

export default function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      console.log('Esta dando erro')
      return
    }

    const PreviewURl = URL.createObjectURL(files[0])

    setPreview(PreviewURl)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        name="coverURL"
        type="file"
        id="media"
        className="invisible h-0 w-10"
      />
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt=""
          className="aspect-video w-full object-cover"
        />
      )}
    </>
  )
}
