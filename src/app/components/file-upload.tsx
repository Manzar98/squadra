'use client'

import { Input } from './ui/input'
import Swal from 'sweetalert2'


export default function UploadPage() {

  const handleUpload = async (selectedFile: File) => {
    if (!selectedFile) return

    const token = sessionStorage.getItem('supabaseToken')

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Not logged in',
        text: 'Please log in to upload files.',
      })
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)

    const res = await fetch('/api/uploads', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    const json = await res.json()
    if (res.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Upload Successful',
        text: `Uploaded to: ${json.url}`,
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: json.error || 'Unknown error',
      })
    }
  }

  return (
    <div className="max-w-md mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
            Upload File
        </label>
      <Input
        type="file"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] || null
          if (selectedFile) handleUpload(selectedFile)
        }}
        className="pl-4 py-3 font-body"
      />
      {/* Removed Upload button */}
    </div>
  )
}
