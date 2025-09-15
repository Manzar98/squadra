import { MessageSquareTextIcon } from "lucide-react";

interface SlideHeaderProps {
  title: string;
  subtitle: string;
  selectedMemberName?: string;
}

export function SlideHeader({ title, subtitle, selectedMemberName }: SlideHeaderProps) {
  const displayTitle = selectedMemberName ? title.replace("[selected user]", selectedMemberName) : title;
  
  return (
    <div className="mb-4 sm:mb-6 mt-9 lg:mt-0">
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-12">
        <MessageSquareTextIcon className="w-6 h-6 sm:w-8 sm:h-8 text-black bg-green-500 rounded" />
        <h4 className="text-[1rem] lg:text-3xl xl:text-[34px] font-semibold sm:font-[600] text-black text-center leading-tight">
          {displayTitle}
        </h4>
      </div>
      <h5 className="text-[1rem] sm:text-xl lg:text-2xl xl:text-[24px] text-black mb-4 sm:mb-6 mt-8 sm:mt-16 lg:mt-[5.125rem] text-center font-heading">
        {subtitle}
      </h5>
    </div>
  );
}
