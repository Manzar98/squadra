"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import RegisterForm from "./register-form";
import CheckEmail from "./check-email";
import { validateReferralCode as validateReferral } from "@/lib/supabase/user-service";

function SignupForm() {
  const searchParams = useSearchParams();
  const [refCode, setRefCode] = useState<string | null>(null);
  const [successEmail, setSuccessEmail] = useState<string | null>(null);

  // ✅ validate referral code
  const validateReferralCode = useCallback(async (code: string) => {
    const valid = await validateReferral(code);
    setRefCode(valid);
  }, []);

  useEffect(() => {
    const code = searchParams.get("ref");
    if (code) validateReferralCode(code);
  }, [searchParams, validateReferralCode]);

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

      <div className="flex-1 flex flex-col justify-between">
        {successEmail ? (
          <CheckEmail email={successEmail} />
        ) : (
          <div className="items-center justify-center px-4">
            <h1 className="text-2xl lg:text-6xl font-semibold text-black text-center mb-5">
              Create your Squadra team
            </h1>
            <RegisterForm refCode={refCode} onSuccess={setSuccessEmail} />
          </div>
        )}

        {/* Footer Links */}
        <div className="pb-8 mt-10">
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

export default function SignupComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}
