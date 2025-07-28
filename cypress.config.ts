import { defineConfig } from "cypress"
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on) {
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_SERVICE_ROLE_KEY! // <-- Use service role
      )

      on("task", {
        async deleteUserCompletely({ email }: { email: string }) {
          // 1. Get user_id from users-info
          const { data: userInfo } = await supabaseAdmin
            .from("users-info")
            .select("user_id")
            .eq("email", email)
            .maybeSingle()

          // 2. Delete users-info row
          await supabaseAdmin.from("users-info").delete().eq("email", email)

          // 3. Delete user from auth
          if (userInfo?.user_id) {
            await supabaseAdmin.auth.admin.deleteUser(userInfo.user_id)
          }

          return null
        },

        async createLoginTestUser({ email, password }: { email: string; password: string }) {
          
        
          // create auth user
          const { data: user, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true
          })
        
          if (createError) throw createError
        
          // also add to users-info
          const { error: insertError } = await supabaseAdmin
            .from('users-info')
            .insert({
              user_id: user.user?.id,
              email,
              name: 'Login Test User',
              team_name: 'QA Team',
              team_role: 'Admin',
              email_consent: true,
              referral_code: Math.random().toString(36).substring(2, 8).toUpperCase()
            })
        
          if (insertError) throw insertError
        
          return user.user
        }
      })
    },
  },
})
