'use client'

import { getSignedUrl } from '@/lib/supabase/storage/client-helper'
import Image from 'next/image'
import { useState, useEffect } from 'react'


interface FileUploadProps {
  value?: string // stored file path from DB
  onUploadComplete?: (path: string) => void
}

export default function FileUpload({ value, onUploadComplete }: FileUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const MAX_SIZE = 2 * 1024 * 1024 // 2MB
  const ALLOWED_TYPES = ['image/png', 'image/jpeg']

  useEffect(() => {
    if (!value) return
    const fetchUrl = async () => {
      try {
        const signedUrl = await getSignedUrl(value, "user-uploads")
        setPreviewUrl(signedUrl)
      } catch (err) {
        console.error("Failed to fetch signed URL:", err)
      }
    }
  
    fetchUrl()
  }, [value])
  

  const handleUpload = async (selectedFile: File) => {
    if (!selectedFile) return

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      alert('Only PNG and JPG files are allowed.')
      return
    }

    if (selectedFile.size > MAX_SIZE) {
      alert('File size must be less than 2MB.')
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)

    const res = await fetch('/api/uploads', {
      method: 'POST',
      body: formData,
    })

    const json = await res.json()
    if (res.ok) {
      // Preview uploaded image (full URL returned from API)
      setPreviewUrl(json.url)

      // Store only the path in parent (DB)
      onUploadComplete?.(json.path)
    } else {
      alert(json.error || 'Upload failed')
    }
  }

  return (
    <div className="flex flex-col items-center">
      <input
        id="avatarUpload"
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] || null
          if (selectedFile) {
            setPreviewUrl(URL.createObjectURL(selectedFile)) // instant preview
            handleUpload(selectedFile)
          }
        }}
      />

      <label htmlFor="avatarUpload" className="cursor-pointer flex flex-col items-center">
        <div className="w-50 h-50 rounded-full overflow-hidden border-2 border-gray-300">
          <Image
            src={previewUrl || '/thumb1.jpg'}
            alt="Avatar"
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="mt-3 text-green-600 font-medium">CHANGE AVATAR</span>
      </label>
    </div>
  )
}
