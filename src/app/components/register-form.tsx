"use client";

import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { CustomDropdown, DropdownItem } from "./drop-down";
import InputField from "./ui/input-field";
import { useToast } from "./ui/toast";
import { signUpWithProfile } from "@/lib/supabase/user-service";

type RegisterFormProps = {
  refCode: string | null;
  onSuccess: (email: string) => void; // callback after successful signup
};

export default function RegisterForm({ refCode, onSuccess }: RegisterFormProps) {
  const toast = useToast();
  const [isRoleError, isSetRoleError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    teamName: "",
    teamRole: "",
    emailConsent: true,
  });

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    if (field === "teamRole") {
      isSetRoleError(value ? false : true);
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true)
    const { email, password, name, teamName, teamRole, emailConsent } = formData;

    if (!email || !password || !name || !teamName || !teamRole) {
      toast.error("Missing Fields", "Please complete all required fields.");
      setIsSubmitting(false)
      return;
    }

    try {
      await signUpWithProfile(
        { email, password, name, teamName, teamRole, emailConsent },
        refCode
      );
      toast.success("Signup Successful!", "Please check your email to confirm your account.");
      onSuccess(email); // tell parent success + pass email
    } catch (error: unknown) {
      console.error("Signup failed", error);
      const message =
        error instanceof Error && error.message === "User already registered"
          ? "An account with this email already exists. Please log in instead."
          : error instanceof Error && error.message
          ? error.message
          : "Something went wrong. Please try again.";
      toast.error("Signup Failed", message);
      setIsSubmitting(false)
    }finally{
      setIsSubmitting(false)
    }
  };

  return (
    <form className="space-y-6 max-w-[448px] lg:m-auto" onSubmit={handleSubmit}>
      <InputField
        type="text"
        label="Name"
        placeholder="Name"
        value={formData.name}
        onChange={(val) => handleInputChange("name", val)}
        required
      />

      <InputField
        type="email"
        label="Email Address"
        placeholder="Email address"
        value={formData.email}
        onChange={(val) => handleInputChange("email", val)}
        required
      />

      <InputField
        type="password"
        label="Password"
        placeholder="Password"
        value={formData.password}
        onChange={(val) => handleInputChange("password", val)}
        required
      />

      <InputField
        type="text"
        label="Team Name"
        placeholder="Team name"
        value={formData.teamName}
        onChange={(val) => handleInputChange("teamName", val)}
        required
      />

      {/* Team Role Dropdown */}
      <div className="space-y-2">
        <label className="text-sm md:text-base font-semibold text-[#5B5C5B]">Team role</label>
        <CustomDropdown
          align="left"
          trigger={
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer bg-white flex items-center justify-between">
              <span className={formData.teamRole ? "text-gray-900" : "text-gray-500"}>
                {formData.teamRole || "Select your role"}
              </span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          }
        >
          {["Admin", "Manager", "Developer", "Designer", "Analyst", "Other"].map((role) => (
            <DropdownItem key={role} onClick={() => handleInputChange("teamRole", role)}>
              {role}
            </DropdownItem>
          ))}
        </CustomDropdown>
        {isRoleError && <p className="text-xs text-red-500">Please select your role</p>}
      </div>

      <Button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 font-bold text-sm py-3 px-4 duration-200 mb-5"
        isLoading={isSubmitting}
      >
        SUBMIT
      </Button>

      <div className="flex items-center space-x-2 mb-5">
        <Checkbox
          id="emailConsent"
          checked={formData.emailConsent}
          onCheckedChange={(checked) => handleInputChange("emailConsent", checked as boolean)}
          className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
        />
        <label htmlFor="emailConsent" className="text-sm text-[#090A09] font-medium font-heading">
          {"It's OK to email me about Squadra"}
        </label>
      </div>

      <p className="text-sm text-[#090A09] font-medium font-heading">
        By continuing, {"you're"} agreeing to our{" "}Customer Terms of Service,{" "}Privacy Policy and Cookie Policy.
      </p>
    </form>
  );
}
