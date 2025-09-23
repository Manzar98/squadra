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
  const [isLoadingUrl, setIsLoadingUrl] = useState(false)

  const MAX_SIZE = 2 * 1024 * 1024 // 2MB
  const ALLOWED_TYPES = ['image/png', 'image/jpeg']

  useEffect(() => {
    // Only run on client-side to prevent hydration issues
    if (typeof window === 'undefined') return
    
    if (!value) {
      setPreviewUrl(null)
      return
    }
    
    const fetchSignedUrl = async () => {
      try {
        setIsLoadingUrl(true)
        // Check if value is already a full URL (from upload) or a path (from DB)
        if (value.startsWith('http')) {
          setPreviewUrl(value)
        } else {
          // Convert raw path to signed URL
          const signedUrl = await getSignedUrl(value, "user-uploads")
          setPreviewUrl(signedUrl)
        }
      } catch (err) {
        console.error("Failed to fetch signed URL:", err)
        setPreviewUrl(null)
      } finally {
        setIsLoadingUrl(false)
      }
    }
  
    fetchSignedUrl()
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
        <div className="w-50 h-50 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100">
          {isLoadingUrl ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-500 text-sm">Loading...</span>
            </div>
          ) : previewUrl ? (
            <Image
              src={previewUrl}
              alt="Avatar"
              width={200}
              height={200}
              className="w-full h-full object-cover"
              onError={() => setPreviewUrl(null)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-500 text-sm">No Image</span>
            </div>
          )}
        </div>
        <span className="mt-3 text-green-600 font-medium">CHANGE AVATAR</span>
      </label>
    </div>
  )
}
