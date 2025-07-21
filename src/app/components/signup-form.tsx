"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Checkbox } from "../components/ui/checkbox"
import { Eye, EyeOff, Check } from "lucide-react"
import Link from "next/link"
import { CustomDropdown, DropdownItem } from "./drop-down"
import Image from "next/image"
import { createSupabaseServerClient } from '../../lib/supabase/client'
import Swal from 'sweetalert2'
import { useSearchParams } from 'next/navigation'

const Label = ({
    htmlFor,
    className,
    children,
}: { htmlFor?: string; className?: string; children: React.ReactNode }) => (
    <label htmlFor={htmlFor} className={className}>
        {children}
    </label>
)

export default function SquadraForm() {
    const supabase = createSupabaseServerClient();
    const searchParams = useSearchParams();
    const [refCode, setRefCode] = useState<string | null>(null);

    useEffect(() => {
        const code = searchParams.get("ref");
        if (code) validateReferralCode(code);
    }, []);

    const validateReferralCode = async (code: string) => {
        const { data } = await supabase
            .from("users-info")
            .select("referral_code")
            .eq("referral_code", code)
            .maybeSingle();

        if (data) {
            setRefCode(code);
        } else {
            setRefCode(null); // ignore invalid ref
        }
    }

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "Melissa Duck",
        email: "melissa.duck@looneytunes.com",
        password: "",
        teamName: "",
        teamRole: "",
        emailConsent: true,
    })
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        teamName: "",
        teamRole: "",
    })

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePassword = (password: string) => {
        return password.length >= 6
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

        let error = ""
        switch (field) {
            case "name":
                error = value.trim() === "" ? "Name is required" : ""
                break
            case "email":
                error = !validateEmail(value) ? "Please enter a valid email address" : ""
                break
            case "password":
                error = !validatePassword(value) ? "Password must be at least 6 characters" : ""
                break
            case "teamName":
                error = value.trim() === "" ? "Team name is required" : ""
                break
            case "teamRole":
                error = value === "" ? "Please select your role" : ""
                break
        }

        setErrors((prev) => ({ ...prev, [field]: error }))
    }

    const isEmailValid = validateEmail(formData.email)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        debugger
        const { data, error } = await supabase
            .from('users-info')
            .select('user_id, email')
            .eq('email', formData.email)
            .single();

        if (data) {
            Swal.fire({
                icon: 'error',
                title: 'User Already Exists',
                text: 'An account with this email already exists. Please log in or use a different email.',
            });
            return;
        }

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
        });

        if (signUpError) {
            let errorMsg = signUpError.message;
            if (
                errorMsg.toLowerCase().includes('user already registered') ||
                errorMsg.toLowerCase().includes('user already exists') ||
                errorMsg.toLowerCase().includes('duplicate key')
            ) {
                errorMsg = 'An account with this email already exists. Please log in or use a different email.';
            }
            Swal.fire({
                icon: 'error',
                title: 'Signup Failed',
                text: errorMsg,
            });
            return;
        }

        const userId = signUpData?.user?.id;
        const newReferralCode = Math.random().toString(36).substring(2, 8).toUpperCase();

        const { data: userInfoData, error: userInfoError } = await supabase
            .from('users-info')
            .insert([
                {
                    user_id: userId,
                    name: formData.name,
                    team_name: formData.teamName,
                    team_role: formData.teamRole,
                    email: formData.email,
                    referral_code: newReferralCode,
                    referred_by: refCode ?? null,
                },
            ])
            .select();

        Swal.fire({
            icon: 'success',
            title: 'Account Created!',
            text: 'A confirmation email has been sent. Please check your inbox.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3FD24D',
            allowOutsideClick: false,
        }).then(() => {
            window.location.href = '/login';
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 bg-white">
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
                <h1 className="text-6xl font-bold text-gray-900 text-center mb-8">Create your Squadra team</h1>

                <form className="space-y-6 lg:w-[44.8%] lg:m-auto font-body" onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700 pb-1">
                            Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
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
                                <div className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer bg-white flex items-center justify-between">
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
