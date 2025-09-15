import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { TeamMember } from "@/types";

interface TeamMemberSelectorProps {
  teamMembers: TeamMember[];
  selectedMember: TeamMember | null;
  onMemberSelect: (member: TeamMember) => void;
  onInviteClick: () => void;
}

export function TeamMemberSelector({
  teamMembers,
  selectedMember,
  onMemberSelect,
  onInviteClick,
}: TeamMemberSelectorProps) {
  return (
    <div className="content-div min-h-[440px] sm:min-h-[390px] lg:min-h-[390px] max-h-[440px] sm:max-h-[350px] lg:max-h-[390px] overflow-y-auto mb-4 sm:mb-6">
      <div className="mb-4">
        <div className="bg-white border border-gray-200 rounded-md w-full sm:w-4/5 lg:w-3/5 xl:w-[20.56vw] mx-auto h-[250px] sm:h-[280px] lg:h-[21.33vh] overflow-y-auto">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              onClick={() => onMemberSelect(member)}
              className={`flex items-center justify-between p-3 sm:p-4 cursor-pointer hover:bg-gray-50 ${
                index !== teamMembers.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              <div>
                <div className="font-medium text-gray-900 text-sm sm:text-base">{member.name}</div>
                <div className="text-xs sm:text-sm text-gray-500">{member.email}</div>
              </div>
              {selectedMember?.id === member.id && (
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 sm:mb-5 text-center">
        <Button
          onClick={onInviteClick}
          variant="outline"
          className="w-full sm:w-4/5 lg:w-3/5 xl:w-[20.97vw] h-12 sm:h-14 lg:h-[6.22vh] border-2 border-green-500 text-green-600 hover:bg-green-50 rounded-full px-4 py-3 sm:py-5 text-xs sm:text-sm lg:text-[14px] tracking-[0.75px] font-bold font-heading"
        >
          INVITE NEW SQUADMATE
        </Button>
      </div>

      {selectedMember && (
        <div className="text-center">
          <p className="text-sm sm:text-base lg:text-[16px] font-semibold lg:font-[600] text-[#2B2C2B] tracking-[0.15px] font-body">
            &apos;You have selected {selectedMember.name}&apos;
          </p>
        </div>
      )}
    </div>
  );
}
