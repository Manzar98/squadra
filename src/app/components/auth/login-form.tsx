import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/auth/client";
import { runWithSpan } from "@/lib/api-client";
import { Button } from "../ui/button";
import InputField from "../ui/input-field";
import { GoogleSignInButton } from "../ui/google-signin-button";
import { LoginFormData } from "@/types";
import ForgotPasswordModal from "../forgot-password";

interface LoginFormProps {
  searchParams: URLSearchParams;
}

export function LoginForm({ searchParams }: LoginFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEmailEmpty = formData.email.trim() === "";
    const isPasswordEmpty = formData.password.trim() === "";

    setErrors({
      email: isEmailEmpty,
      password: isPasswordEmpty,
    });

    if (isEmailEmpty || isPasswordEmpty) return;

    setError(null);
    setIsSubmitting(true);

    try {

      const loginData = await runWithSpan(
        "User Login",
        async () => {
          const { data, error: loginError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          });
      
          if (loginError) {
            setError(loginError.message);
            throw loginError;
          }
      
          return data; // return to outer scope
        },
        { email: formData.email },
      );
      let redirectTo = searchParams.get('redirectedFrom') || '/dashboard/mastery-zones';
      console.log("Last sign-in:", loginData.user?.last_sign_in_at);
      if (!loginData.user?.last_sign_in_at) {
        redirectTo = '/dashboard';
      }

      
      router.push(redirectTo);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === "string") {
        setError(error);
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const redirectToGoogleAuth = async () => {
    await runWithSpan(
      "Redirect to Google Auth",
      async () => {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const redirectBaseUrl = process.env.NEXT_PUBLIC_REDIRECT_URL;
        if (!supabaseUrl || !redirectBaseUrl)
          throw new Error("Missing env vars");

        const googleAuthUrl = `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${redirectBaseUrl}/dashboard`;
        window.location.href = googleAuthUrl;
      },
      { action: "redirect_to_google_auth" },
    );
  };
  const handleForgotPassword = () => {
    setIsModalOpen(true);
  };

  return (
    <>
    <form onSubmit={handleLogin}>
      {/* Email Field */}
      <div className={errors.email ? "mb-[0.6rem]" : "mb-[1.88rem]"}>
        <InputField
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={(val) => handleInputChange("email", val)}
          required
          errorMessage={errors.email ? "Email is required" : ""}
          className="lg:w-[82.5%] pl-4 pr-11 py-3 font-body"
        />
      </div>

      {/* Password Field */}
      <div className="mb-7 lg:w-[82.5%]">
        <InputField
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(val) => handleInputChange("password", val)}
          required
          errorMessage={errors.password ? "Password is required" : ""}
        />
      </div>

      {/* Forgot Password & Sign In Button */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-[29px] mb-[9px] w-full lg:w-[83%] gap-4">
        <button
          type="button"
          onClick={() => {handleForgotPassword()}}
          className="text-[#00A600] text-[16px] font-[600] tracking-[0.15px] leading-[1.5] font-body hover:underline"
        >
          Forgot password?
        </button>
        <Button
          type="submit"
          data-testid="login-button"
          className="w-full lg:w-[150px] h-[42px] text-[14px] font-[700] font-heading hover:bg-[#00a41c] transition-all"
          isLoading={isSubmitting}
        >
          SIGN IN
        </Button>
      </div>

      <div className="h-[20px]">
        {error && (
          <p className="text-red-500 text-sm ml-2">
            {error}
          </p>
        )}
      </div>

      {/* Google Sign In */}
      <div className="w-full flex justify-left mt-8">
        <GoogleSignInButton onClick={redirectToGoogleAuth} />
      </div>

      {/* Sign Up Link */}
      <div className="mt-10 text-center lg:text-left lg:mt-24.5">
        <p className="text-sm lg:text-[16px] font-[600] tracking-[0.15px] font-body text-black">
          Don&apos;t have an account yet?{" "}
          <button
            type="button"
            className="text-[#00A600] font-[600] hover:underline transition-all tracking-[0.15px] pl-3"
            onClick={() => {
              window.location.href = "/signup";
            }}
          >
            Sign up
          </button>
        </p>
      </div>  
    </form>
    <ForgotPasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
</>
  );
}
