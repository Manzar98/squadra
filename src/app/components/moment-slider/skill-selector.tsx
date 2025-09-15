import { SelectedSkill } from "@/types";

interface Skill {
  id: number;
  name: string;
}

interface SkillSelectorProps {
  skills: Skill[];
  selectedSkills: SelectedSkill[];
  onSkillToggle: (skill: SelectedSkill) => void;
}

export function SkillSelector({ skills, selectedSkills, onSkillToggle }: SkillSelectorProps) {
  const handleSkillClick = (skill: Skill) => {
    const selectedSkill: SelectedSkill = {
      id: skill.id.toString(),
      name: skill.name,
    };

    if (selectedSkills.some((s) => s.name === skill.name)) {
      onSkillToggle(selectedSkill);
    } else {
      onSkillToggle(selectedSkill);
    }
  };

  return (
    <div className="content-div min-h-[440px] sm:min-h-[390px] lg:min-h-[390px] max-h-[440px] sm:max-h-[350px] lg:max-h-[390px] overflow-y-auto mb-4 sm:mb-6">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-5xl mx-auto text-center px-2">
        {skills.map((skill) => (
          <button
            key={skill.id}
            onClick={() => handleSkillClick(skill)}
            className={`h-8 sm:h-10 px-3 sm:px-4 align-middle rounded-full border-2 text-sm sm:text-base lg:text-[18px] tracking-[0.5px] font-medium transition-colors font-body ${
              selectedSkills.some((s) => s.name === skill.name)
                ? "bg-green-50 text-green-500 border-green-500"
                : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
            }`}
          >
            {skill.name}
          </button>
        ))}
      </div>
    </div>
  );
}
