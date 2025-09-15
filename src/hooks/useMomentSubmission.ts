import { useState } from "react";
import { createClient } from "@/lib/supabase/auth/client";
import { runWithSpan } from "@/lib/api-client";
import { MomentFormData } from "@/types";

export function useMomentSubmission() {
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitMoment = async (formData: MomentFormData): Promise<boolean> => {
    if (!formData.selectedMember || formData.selectedSkills.length === 0) {
      setError("Please select a team member and at least one skill");
      return false;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await runWithSpan("Insert User Skills", async () => {
        for (const skill of formData.selectedSkills) {
          const { error } = await supabase
            .from("users-skills")
            .insert([
              {
                user_info_id: formData.selectedMember?.id,
                skill_id: skill.id,
                description: formData.noteText,
                emoji: formData.selectedEmoji,
              },
            ])
            .single();

          if (error) throw error;
        }
      }, { 
        memberId: formData.selectedMember?.id, 
        skillsCount: formData.selectedSkills.length 
      });

      return true;
    } catch (error) {
      console.error("Error submitting moment:", error);
      setError("Failed to submit moment. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitMoment,
    isSubmitting,
    error,
  };
}
