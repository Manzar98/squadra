import { createClient } from "@/lib/supabase/auth/client"

export async function getSignedUrl(filePath: string, bucketName: string) {
  // Ensure the bucketName is valid and not empty
  const supabase =  createClient();
  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath)    // bucket name passed from request
  
  return data.publicUrl
}
