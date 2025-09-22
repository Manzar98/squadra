import { NextResponse } from 'next/server'
import { createClient } from '../../../lib/supabase/auth/server'

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (!user || authError) {
    return NextResponse.json({ error: 'Invalid user' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  // ✅ Validate file type
  if (!['image/png', 'image/jpeg'].includes(file.type)) {
    return NextResponse.json({ error: 'Only PNG and JPG are allowed' }, { status: 400 })
  }

  // ✅ Validate file size (2MB)
  const MAX_SIZE = 2 * 1024 * 1024
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File size exceeds 2MB' }, { status: 400 })
  }

  const fileExt = file.name.split('.').pop()
  const filePath = `${user.id}/${Date.now()}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('user-uploads')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from('user-uploads').getPublicUrl(filePath)

  return NextResponse.json({ path: filePath, url: publicUrl })
}
