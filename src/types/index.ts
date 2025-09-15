export interface TeamMember {
  id: string;
  name: string;
  email: string;
  selected?: boolean;
}

export interface SelectedSkill {
  id: string;
  name: string;
}

export interface AuthenticatedUser {
  id: string;
  referral_code: string | null;
}

export interface EmojiOption {
  symbol: string;
  text: string;
  tooltip: string;
}

export interface MomentFormData {
  selectedMember: TeamMember | null;
  selectedSkills: SelectedSkill[];
  noteText: string;
  selectedEmoji: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  teamName: string;
  teamRole: string;
  emailConsent: boolean;
}
