"use client";

import { useId, useState } from "react";
import { Input } from "./input";
import { Eye, EyeOff } from "lucide-react";
import {
  isValidEmail,
  isValidPassword,
  isValidPhone,
} from "@/lib/input-helper";

interface InputFieldProps {
  type: "text" | "email" | "password" | "number" | "phone";
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  className?: string;
  dataTestId?: string;
  /** external error (e.g. "Passwords do not match") — overrides internal validation */
  errorMessage?: string | null;
  /** how many lines of error to allow (default 2) */
  errorLines?: number;
}

export default function InputField({
  type,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  dataTestId,
  errorMessage = null,
  errorLines = 2,
}: InputFieldProps) {
  const id = useId();
  const [internalError, setInternalError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  // validate on blur (internal validation)
  const validate = (val: string) => {
    if (!val && required) {
      setInternalError(`${label || "This field"} is required`);
      return;
    }
    switch (type) {
      case "email":
        !isValidEmail(val) && setInternalError("Invalid email address");
        break;
      case "password":
        !isValidPassword(val) &&
          setInternalError(
            "Min 5 chars, number, special, no spaces"
          );
        break;
      case "phone":
        !isValidPhone(val) && setInternalError("Invalid phone number");
        break;
      default:
        setInternalError(null);
    }
  };

  // display external error if provided, otherwise internal
  const displayError = errorMessage ?? internalError;

  // CSS for clamping error lines (works in modern browsers)
  const clampStyle =
    errorLines && errorLines > 0
      ? {
          display: "-webkit-box",
          WebkitLineClamp: String(errorLines),
          WebkitBoxOrient: "vertical" as const,
          overflow: "hidden",
        }
      : {};

  return (
    // keep the original spacing between fields unchanged
    <div className="mb-[1.88rem]">
      {label && (
        <label className="block mb-2 text-sm md:text-base font-semibold text-[#5B5C5B] font-body" htmlFor={id}>
          {label}
        </label>
      )}

      {/* relative so error can be positioned absolutely without affecting flow */}
      <div className="relative">
        <Input
          id={id}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          data-testid={dataTestId}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setInternalError(null);
          }}
          onBlur={(e) => validate(e.target.value)}
          aria-invalid={!!displayError}
          aria-describedby={displayError ? `${id}-error` : undefined}
          className={`w-full h-[46px] pl-4 pr-11 font-body ${className}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}

        {/* absolutely positioned error — appears visually under the input but DOES NOT change layout */}
        <div className="absolute left-4 top-full mt-[5px] right-0 pointer-events-none">
          {displayError && (
            <p
              id={`${id}-error`}
              className="text-[12px] font-normal leading-[1.33] tracking-[0.4px] font-heading text-left text-red-500"
              style={clampStyle}
            >
              {displayError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
