interface GoogleSignInButtonProps {
  onClick: () => void;
  className?: string;
}

export function GoogleSignInButton({ onClick, className = "" }: GoogleSignInButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 w-full lg:w-[83%] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full py-3 px-4 text-[15px] font-semibold font-heading text-gray-900 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all ${className}`}
    >
      <span className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g>
            <path
              d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-3.359 2.75-6.148 6.125-6.148 1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.719-1.594-3.938-2.57-6.656-2.57-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.547-4.031 9.547-9.719 0-.656-.07-1.156-.156-1.629z"
              fill="#4285F4"
            />
            <path
              d="M3.153 7.345l3.281 2.406c.891-1.781 2.578-3.008 4.606-3.008 1.125 0 2.156.391 2.953 1.031l2.703-2.633c-1.719-1.594-3.938-2.57-6.656-2.57-3.625 0-6.703 2.07-8.219 5.074z"
              fill="#34A853"
            />
            <path
              d="M12.04 22c2.672 0 4.922-.883 6.563-2.406l-3.047-2.492c-.844.57-1.922.914-3.516.914-2.859 0-5.289-1.93-6.156-4.523l-3.242 2.5c1.5 3.008 4.672 5.007 8.398 5.007z"
              fill="#FBBC05"
            />
            <path
              d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-.547.07-1.078.172-1.578l-3.281-2.406c-.531 1.07-.844 2.273-.844 3.584 0 5.523 4.477 10 10 10 5.75 0 9.547-4.031 9.547-9.719 0-.656-.07-1.156-.156-1.629z"
              fill="#EA4335"
            />
          </g>
        </svg>
      </span>
      <span className="flex-1 text-center">Sign in with Google</span>
    </button>
  );
}
