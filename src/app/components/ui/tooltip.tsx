// Simple Tooltip component
function Tooltip({
    children,
    text,
    position = "top",
  }: {
    children: React.ReactNode
    text: string
    position?: "top" | "bottom" | "left" | "right"
  }) {
    // Map position to Tailwind classes
    let tooltipPositionClass = ""
    switch (position) {
      case "bottom":
        tooltipPositionClass = "top-full left-1/2 -translate-x-1/2 mt-2"
        break
      case "left":
        tooltipPositionClass = "right-full top-1/2 -translate-y-1/2 mr-2"
        break
      case "right":
        tooltipPositionClass = "left-full top-1/2 -translate-y-1/2 ml-2"
        break
      case "top":
      default:
        tooltipPositionClass = "-top-8 left-1/2 -translate-x-1/2"
        break
    }
    return (
        <div className="relative group flex items-center font-body">
          {children}
          <div
            className={`absolute ${tooltipPositionClass} z-10 opacity-0 group-hover:opacity-100 pointer-events-none transition bg-[#2B2C2B] text-white text-sm rounded px-2 py-1 whitespace-nowrap`}
          >
            {text}
          </div>
        </div>
      )
    }

export { Tooltip }