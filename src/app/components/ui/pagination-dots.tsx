interface PaginationDotsProps {
  totalSlides: number;
  currentSlide: number;
  onSlideChange: (slide: number) => void;
}

export function PaginationDots({ totalSlides, currentSlide, onSlideChange }: PaginationDotsProps) {
  return (
    <div className="flex justify-center space-x-2 mb-4 sm:mb-6">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium cursor-pointer transition-colors border-2 ${
            index <= currentSlide
              ? "bg-green-500 border-black text-black"
              : "bg-gray-200 text-gray-500 hover:bg-gray-300 border-black"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
