export const TEAM_ROLES = [
  "Admin",
  "Manager", 
  "Developer",
  "Designer",
  "Analyst",
  "Other"
] as const;

export type TeamRole = typeof TEAM_ROLES[number];
