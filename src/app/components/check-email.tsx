"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

type CheckEmailProps = {
  email: string;
};

export default function CheckEmail({ email }: CheckEmailProps) {
  const router = useRouter();

  const handleContinue = () => {
    router.replace("/");
  };

  return (
    <div className="items-center justify-center px-4">
      <h1 className="text-2xl lg:text-6xl font-semibold text-black text-center mb-5">
        Check your email!
      </h1>

      <div className="mt-9 text-center max-w-5xl mx-auto justify-center">
        <p className="text-lg text-[#090A09] font-body">
          We’ve emailed a special link to <strong>{email}</strong>. Click the
          link to confirm your address and get started. Wrong email? Please
          re-enter your address.
        </p>

        <p className="text-lg text-[#090A09] mt-5 font-body">
          Did not receive an email? Please check your spam folder or re-send
          verification email.
        </p>

        <Button
          type="button"
          data-testid="login-button"
          onClick={handleContinue}
          className="w-full lg:w-[150px] h-[42px] text-[14px] font-[700] hover:bg-[#00a41c] mt-20"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
