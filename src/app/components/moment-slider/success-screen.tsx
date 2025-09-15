import Image from "next/image";
import { Button } from "../ui/button";

interface SuccessScreenProps {
  onContinue: () => void;
}

export function SuccessScreen({ onContinue }: SuccessScreenProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mt-11 lg:mt-0 mb-4 sm:mb-6 flex items-center justify-center">
          <Image
            src="/success.gif"
            alt="Celebration"
            width={250}
            height={250}
            className="object-contain mx-auto"
            priority
          />
        </div>

        <div className="mb-8 sm:mb-12 lg:mb-15 space-y-4 sm:space-y-6 lg:space-y-8">
          <h5 className="text-lg sm:text-xl lg:text-2xl xl:text-[24px] text-black text-center font-heading leading-relaxed px-2">
            Way to go!! With this simple gesture&lsquo; your Squad can celebrate moving one step closer to Mastery!
          </h5>
          <h5 className="text-lg sm:text-xl lg:text-2xl xl:text-[24px] text-black text-center font-heading leading-relaxed px-2">
            Now&lsquo; as your Squadmates give you Moments&lsquo; your Mastery Zones will magically unlock and ignite
            the Squad&apos;s Quest too!
          </h5>
        </div>

        <div className="flex justify-center pb-4 sm:pb-6">
          <Button
            onClick={onContinue}
            className="w-full sm:w-auto min-w-[200px] lg:w-60 h-12 sm:h-14 bg-green-500 hover:bg-green-600 text-black font-bold rounded-full text-xs sm:text-sm lg:text-[14px] font-heading tracking-[0.75px] px-4 sm:px-6"
          >
            EXPLORE SQUADRA!
          </Button>
        </div>
      </div>
    </div>
  );
}
