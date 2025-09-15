import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function AuthLayout({ children, showSidebar = true }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Section - Green Background */}
      {showSidebar && (
        <div
          className="hidden lg:flex w-3/4 items-center justify-center"
          style={{
            background: "linear-gradient(220.11deg, #3FD24D 0%, #9CE59C 100%)",
          }}
        >
          <div className="w-[591px] h-[234px] text-left font-heading text-[96px] font-[800] tracking-[1px] text-[color:var(--secondary-900)] leading-none">
            <h1>Be</h1>
            <h1>
              Masterful<span className="ml-2 text-[40px]">🔥</span>
            </h1>
          </div>
        </div>
      )}

      {/* Right Section - Form */}
      <div className={`bg-white flex flex-col ${showSidebar ? 'w-full lg:w-1/2' : 'w-full'}`}>
        <div className="flex-1 flex justify-center px-16">
          <div className="w-full max-w-[400px] mx-auto">
            {/* Logo */}
            <div className="mt-10 text-center lg:text-left">
              <Image
                src="/logo.png"
                alt="Squad Logo"
                width={256}
                height={60}
                className="h-[60px] w-[256px] inline-block"
                priority
              />
            </div>

            {children}
          </div>
        </div>

        {/* Footer Links */}
        <div className="px-16 pb-8">
          <div className="max-w-[400px] mx-auto">
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm font-body text-center lg:text-left">
              <button className="text-[#00A600] lg:text-[16px] font-semibold hover:underline transition-all">
                Privacy & Terms
              </button>
              <button className="text-[#00A600] lg:text-[16px] font-semibold hover:underline transition-all">
                Help? Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
