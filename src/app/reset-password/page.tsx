"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../components/ui/button";
import InputField from "../components/ui/input-field";
import { createClient } from "../../lib/supabase/auth/client";
import { useRouter } from "next/navigation";


export default function ResetPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const supabase = createClient();
  const router = useRouter();
  useEffect(() => {
    // Example: #access_token=xxx&refresh_token=yyy&type=recovery
    const hash = window.location.hash.substring(1) // remove the #
    const params = new URLSearchParams(hash)
    const access_token = params.get("access_token")
    const refresh_token = params.get("refresh_token")

    if (access_token && refresh_token) {
      supabase.auth
        .setSession({
          access_token,
          refresh_token,
        })
        .then(({ error }) => {
          if (!error) {
            // ✅ clean URL after setting session
            router.replace("/reset-password")
          }
        })
    }
  }, [supabase, router])


  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    if (!password || !confirmPassword) {
      setConfirmError("Both fields are required");
      setIsSubmitting(false);
      return;
    }
    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }
    setConfirmError(null);
    const { error } = await supabase.auth.updateUser({
        password: password,
      });
      setConfirmPassword("");
      setPassword("");
      setIsSubmitting(false);
      router.replace("/");
    if (error) {
        setSubmitError(error.message);
        setIsSubmitting(false);
        return;
        }
    // ✅ sign out the user so they must log in with new password
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo */}
      <div className="pt-10 mx-auto lg:pl-6 lg:mx-0">
        <Image
          src="/logo.png"
          alt="Squad Logo"
          width={246}
          height={60}
          className="h-[60px] w-[246px]"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Heading + Form */}
        <div className="items-center justify-center px-4 mt-[60px]">
          {/* Reset Password Heading */}
          <h1 className="text-[30px] md:text-5xl lg:text-6xl font-semibold text-black text-center mb-[60px]">
            Reset your password
          </h1>

          {/* Form */}
          <div className="w-full mx-auto flex justify-center">
            <form className="w-full max-w-[330px]" onSubmit={handleResetPassword}>
              {/* Password Field */}
              <InputField
                type="password"
                placeholder="Enter your new password here"
                value={password}
                onChange={setPassword}
                required
              />

              {/* Confirm Password Field */}
              <InputField
                type="password"
                placeholder="Re-enter your new password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                required
                errorMessage={confirmError}
              />

    
              <div className="flex justify-center mt-[50px]">
                <Button
                  type="submit"
                  className="w-[221px] h-[42px] rounded-full text-black text-[14px] font-[700] tracking-[0.75px] font-heading hover:bg-[#00a41c] transition-all uppercase"
                  isLoading={isSubmitting}
                >
                  Reset My Password
                </Button>
              </div>
              <div className="h-[20px] mt-2">
                {submitError && (
                  <p className="text-red-500 text-sm ml-2">
                    {submitError}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <div className="pb-8 mt-25 md:mt-[339px]">
          <div className="flex justify-center gap-8 text-sm font-body">
            <button className="text-[#00A600] font-semibold hover:underline transition-all">
              Privacy & Terms
            </button>
            <button className="text-[#00A600] font-semibold hover:underline transition-all">
              Help? Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
