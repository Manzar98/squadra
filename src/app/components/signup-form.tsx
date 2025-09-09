"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { Eye, EyeOff, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { CustomDropdown, DropdownItem } from "./drop-down";
import { supabase } from "@/lib/supabase/auth/client";
import { runWithSpan } from "@/lib/api-client";

interface LabelProps {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ htmlFor, className, children }) => (
  <label htmlFor={htmlFor} className={className}>
    {children}
  </label>
);

interface FormData {
  name: string;
  email: string;
  password: string;
  teamName: string;
  teamRole: string;
  emailConsent: boolean;
}

interface FormErrors {
  name: string;
  email: string;
  password: string;
  teamName: string;
  teamRole: string;
}

export default function SquadraForm() {
  const searchParams = useSearchParams();
  const [refCode, setRefCode] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "Melissa Duck",
    email: "",
    password: "",
    teamName: "",
    teamRole: "",
    emailConsent: true,
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    password: "",
    teamName: "",
    teamRole: "",
  });

  const validateReferralCode = useCallback(async (code: string) => {
    const { data } = await supabase
      .from("users-info")
      .select("referral_code")
      .eq("referral_code", code)
      .maybeSingle();

    setRefCode(data?.referral_code === code ? code : null);
  }, []);

  useEffect(() => {
    const code = searchParams.get("ref");
    if (code) validateReferralCode(code);
  }, [searchParams, validateReferralCode]);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) => password.length >= 6;

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    let error = "";

    switch (field) {
      case "name":
        error = value === "" ? "Name is required" : "";
        break;
      case "email":
        error = typeof value === "string" && !validateEmail(value) ? "Please enter a valid email address" : "";
        break;
      case "password":
        error = typeof value === "string" && !validatePassword(value) ? "Password must be at least 6 characters" : "";
        break;
      case "teamName":
        error = value === "" ? "Team name is required" : "";
        break;
      case "teamRole":
        error = value === "" ? "Please select your role" : "";
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const isEmailValid = validateEmail(formData.email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, name, teamName, teamRole, emailConsent } = formData;
  
    async function generateUniqueReferralCode() {
      while (true) {
        const candidate = Math.random().toString(36).substring(2, 8).toUpperCase();
        const { data, error } = await supabase
          .from("users-info")
          .select("id")
          .eq("referral_code", candidate)
          .maybeSingle();
        if (!error && !data) return candidate;
      }
    }
  
    try {
      await runWithSpan("User Signup", async () => {
        // 1. Sign Up User
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
  
        if (signUpError) {
          Swal.fire({
            icon: "error",
            title: "Signup Failed",
            text:
              signUpError.message === "User already registered"
                ? "An account with this email already exists. Please log in instead."
                : signUpError.message,
          });
          throw signUpError;
        }
  
        const userId = signUpData.user?.id;
        if (!userId) {
          Swal.fire({
            icon: "error",
            title: "Signup Error",
            text: "User ID not returned. Please try again.",
          });
          throw new Error("User ID not returned");
        }
  
        // 2. Check existing user info
        const { data: existingUserInfo } = await supabase
          .from("users-info")
          .select("id, referral_code")
          .eq("email", email)
          .maybeSingle();
  
        let referralCode = existingUserInfo?.referral_code || "";
  
        // 3. Generate referral code if not present
        if (!referralCode) {
          referralCode = await generateUniqueReferralCode();
        }
  
        // 4. Update or insert
        if (existingUserInfo) {
          const { error: updateError } = await supabase
            .from("users-info")
            .update({
              user_id: userId,
              name,
              team_name: teamName,
              team_role: teamRole,
              email_consent: emailConsent,
              referral_code: referralCode,
            })
            .eq("id", existingUserInfo.id);
  
          if (updateError) {
            Swal.fire({ icon: "error", title: "Update Failed", text: updateError.message });
            throw updateError;
          }
        } else {
          const insertResult = await supabase.from("users-info").insert({
            user_id: userId,
            email,
            name,
            team_name: teamName,
            team_role: teamRole,
            email_consent: emailConsent,
            referral_code: referralCode,
            referred_by: refCode || null,
          });
  
          if (insertResult.error) {
            // Handle duplicate referral code collision
            if (insertResult.error.message.includes("duplicate key value violates unique constraint")) {
              referralCode = await generateUniqueReferralCode();
              const retryInsert = await supabase.from("users-info").insert({
                user_id: userId,
                email,
                name,
                team_name: teamName,
                team_role: teamRole,
                email_consent: emailConsent,
                referral_code: referralCode,
                referred_by: refCode || null,
              });
              if (retryInsert.error) {
                Swal.fire({ icon: "error", title: "Insert Failed", text: retryInsert.error.message });
                throw retryInsert.error;
              }
            } else {
              Swal.fire({ icon: "error", title: "Insert Failed", text: insertResult.error.message });
              throw insertResult.error;
            }
          }
        }
  
        // 5. Show success message
        Swal.fire({
          icon: "success",
          title: "Signup Successful!",
          text: "Please check your email to confirm your account.",
        });
      }, { email, teamName, teamRole });
    } catch (error) {
      console.error("Signup failed", error);
    }
  };
  
  
  
    return (
        <div className="min-h-scree flex items-center justify-center p-4 bg-white">
            <div className="">
                {/* Logo */}
                <div className="flex items-center mb-12">
                    <div className="flex items-center space-x-2">
                        <Image
                            src="/logo.png"
                            alt="Squad Logo"
                            width={256}
                            height={60}
                            className="h-[60px] w-[256px] inline-block"
                            priority
                        />
                    </div>
                </div>

                {/* Main Heading */}
                <h1 className="text-2xl lg:text-6xl font-bold text-gray-900 text-center mb-8">Create your Squadra team</h1>

                <form className="space-y-6 lg:w-[44.8%] lg:m-auto font-body" onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700 pb-1">
                            Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            data-testid="name-input"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="w-full lg-h-[46px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500">{errors.name || "Enter your full name"}</p>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email address
                        </Label>
                        <div className="relative">
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                data-testid="email-input"
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${isEmailValid ? "border-green-500" : "border-gray-300"
                                    }`}
                            />
                            {isEmailValid && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <Check className="w-5 h-5 text-green-500" />
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-gray-500">{errors.email || "We'll use this to send you important updates"}</p>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="6 characters or more"
                                data-testid="password-input"
                                value={formData.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        <p className="text-xs text-gray-500">
                            {errors.password || "Choose a strong password to keep your account secure"}
                        </p>
                    </div>

                    {/* Team Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor="teamName" className="text-sm font-medium text-gray-700">
                            Team name
                        </Label>
                        <Input
                            id="teamName"
                            type="text"
                            placeholder="Your company name on Squadra"
                            value={formData.teamName}
                            data-testid="teamName-input"
                            onChange={(e) => handleInputChange("teamName", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500">{errors.teamName || "This will be visible to your team members"}</p>
                    </div>

                    {/* Team Role Field */}
                    <div className="space-y-2">
                        <Label htmlFor="teamRole" className="text-sm font-medium text-gray-700">
                            Team role
                        </Label>
                        <CustomDropdown
                            align="left"
                            trigger={
                                <div data-testid="role-input" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer bg-white flex items-center justify-between">
                                    <span className={formData.teamRole ? "text-gray-900" : "text-gray-500"}>
                                        {formData.teamRole || "Select your role"}
                                    </span>
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            }
                        >
                            <DropdownItem onClick={() => handleInputChange("teamRole", "admin")}>Admin</DropdownItem>
                            <DropdownItem onClick={() => handleInputChange("teamRole", "manager")}>Manager</DropdownItem>
                            <DropdownItem onClick={() => handleInputChange("teamRole", "developer")}>Developer</DropdownItem>
                            <DropdownItem onClick={() => handleInputChange("teamRole", "designer")}>Designer</DropdownItem>
                            <DropdownItem onClick={() => handleInputChange("teamRole", "analyst")}>Analyst</DropdownItem>
                            <DropdownItem onClick={() => handleInputChange("teamRole", "other")}>Other</DropdownItem>
                        </CustomDropdown>
                        <p className="text-xs text-gray-500">
                            {errors.teamRole || "Select the role that best describes your position"}
                        </p>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        data-testid="signup-button"
                        className="w-full bg-green-500 hover:bg-green-600 text-black font-bold text-sm py-3 px-4 rounded-full transition-colors duration-200 font-heading"
                    >
                        SUBMIT
                    </Button>

                    {/* Email Consent Checkbox */}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="emailConsent"
                            checked={formData.emailConsent}
                            onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, emailConsent: checked as boolean }))}
                            className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                        />
                        <Label htmlFor="emailConsent" className="text-sm text-gray-700">
                            {"It's OK to email me about Squadra"}
                        </Label>
                    </div>

                    {/* Terms Text */}
                    <p className="text-xs text-gray-600 leading-relaxed">
                        By continuing, {"you're"} agreeing to our{" "}
                        <Link href="#" className="text-gray-800 hover:underline">
                            Customer Terms of Service
                        </Link>
                        ,{" "}
                        <Link href="#" className="text-gray-800 hover:underline">
                            Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-gray-800 hover:underline">
                            Cookie Policy
                        </Link>
                        .
                    </p>
                </form>

                {/* Footer Links */}
                <div className="flex justify-center space-x-8 mt-8 pt-6 border-t border-gray-100">
                    <Link href="#" className="text-sm text-green-600 hover:underline">
                        Privacy & Terms
                    </Link>
                    <Link href="#" className="text-sm text-green-600 hover:underline">
                        Help? Contact Support
                    </Link>
                </div>
            </div>
        </div>
    )
}
