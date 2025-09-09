"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../components/ui/button";
import InputField from "../components/ui/input-field";

export default function ResetPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!password || !confirmPassword) {
      setConfirmError("Both fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match");
      return;
    }
    setConfirmError(null);

    // ✅ Call your API here
    console.log("Reset password submitted", { password, confirmPassword });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo */}
      <div className="pt-10 pl-10">
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
          <h1 className="text-[30px] md:text-5xl lg:text-6xl font-bold text-black text-center mb-[60px]">
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

              {/* Button */}
              {submitError && (
                <span className="text-red-500 text-sm mt-2 block text-center">
                  {submitError}
                </span>
              )}
              
              <div className="flex justify-center mt-[50px]">
                <Button
                  type="submit"
                  className="w-[221px] h-[42px] rounded-full text-black text-[14px] font-[700] tracking-[0.75px] font-heading hover:bg-[#00a41c] transition-all uppercase"
                >
                  Reset My Password
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <div className="pb-8 mt-[339px]">
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
