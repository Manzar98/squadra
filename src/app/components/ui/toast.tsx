"use client";

import { CircleCheckIcon, CircleX, InfoIcon } from "lucide-react";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type ToastVariant = "success" | "error" | "info";

interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  durationMs?: number;
}

interface ToastRecord extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  show: (options: ToastOptions) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const handle = timeoutsRef.current[id];
    if (handle) {
      clearTimeout(handle);
      delete timeoutsRef.current[id];
    }
  }, []);

  const show = useCallback((options: ToastOptions) => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const toast: ToastRecord = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant ?? "info",
      durationMs: options.durationMs ?? 3500,
    };
    setToasts((prev) => [...prev, toast]);
    timeoutsRef.current[id] = setTimeout(() => remove(id), toast.durationMs);
  }, [remove]);

  useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach(clearTimeout);
      timeoutsRef.current = {};
    };
  }, []);

  const value = useMemo<ToastContextValue>(() => ({
    show,
    success: (title, description) => show({ title, description, variant: "success" }),
    error: (title, description) => show({ title, description, variant: "error" }),
    info: (title, description) => show({ title, description, variant: "info" }),
  }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={remove} />
    </ToastContext.Provider>
  );
}

function ToastViewport({ toasts, onDismiss }: { toasts: ToastRecord[]; onDismiss: (id: string) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-3 w-[92vw] max-w-sm">
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} onDismiss={() => onDismiss(t.id)} />
      ))}
    </div>
  );
}

function ToastCard({ toast, onDismiss }: { toast: ToastRecord; onDismiss: () => void }) {
  const variantStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  } as const;

  const icon = {
    success: <CircleCheckIcon className="h-5 w-5 text-white" />,
    error: <CircleX className="h-5 w-5 text-white" />,
    info: <InfoIcon className="h-5 w-5 text-white" />,
  } as const;

  return (
    <div
      className={`rounded-lg shadow-lg p-3 pr-2 flex items-start gap-3 ${variantStyles[toast.variant ?? "info"]}`}
    >
      <div className="mt-0.5">{icon[toast.variant ?? "info"]}</div>
      <div className="flex-1">
        <p className="text-sm font-semibold">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 text-sm opacity-90">{toast.description}</p>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-white/20"
        aria-label="Close"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}



