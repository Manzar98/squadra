import { TextArea } from "../ui/textarea";
import { EMOJI_OPTIONS } from "@/constants/emojis";

interface NoteComposerProps {
  noteText: string;
  selectedEmoji: string;
  onNoteChange: (note: string) => void;
  onEmojiSelect: (emoji: string, text: string) => void;
}

export function NoteComposer({
  noteText,
  selectedEmoji,
  onNoteChange,
  onEmojiSelect,
}: NoteComposerProps) {
  return (
    <div className="content-div min-h-[440px] sm:min-h-[390px] lg:min-h-[390px] max-h-[440px] sm:max-h-[390px] lg:max-h-[390px] overflow-y-auto mb-4 sm:mb-6">
      <div className="mb-4 sm:mb-6">
        <TextArea
          value={noteText}
          onChange={(e) => onNoteChange(e.target.value)}
          className="w-full max-w-full sm:max-w-[90vw] lg:max-w-[80vw] mx-auto h-24 sm:h-32 lg:h-34 p-3 sm:p-4 border-2 border-green-500 rounded-lg resize-none focus:!border-green-600 active:!border-green-600 focus:!ring-0 text-gray-700 text-sm sm:text-base lg:text-base leading-relaxed font-body font-semibold lg:font-[600]"
          placeholder="Add your note here..."
        />
      </div>

      <div className="px-2">
        <div className="flex justify-center gap-1 sm:gap-2 flex-wrap">
          {EMOJI_OPTIONS.map((emoji) => (
            <div className="relative group" key={emoji.symbol}>
              <span
                onClick={() => onEmojiSelect(emoji.symbol, emoji.text)}
                className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-2xl sm:text-3xl lg:text-[3rem] rounded-full cursor-pointer transition-all duration-300 ${
                  selectedEmoji === emoji.symbol
                    ? "scale-110 sm:scale-125 opacity-100"
                    : "opacity-30"
                }`}
              >
                {emoji.symbol}
              </span>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 sm:px-3 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {emoji.tooltip}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
