import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/auth/client";
import { runWithSpan } from "@/lib/api-client";
import { TeamMember, AuthenticatedUser } from "@/types";

export function useTeamMembers() {
  const supabase = createClient();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser>({
    id: "",
    referral_code: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        await runWithSpan("Fetch Team Members", async () => {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return [];

          const { data: userInfo } = await supabase
            .from('users-info')
            .select('referral_code')
            .eq('user_id', user.id)
            .single();

          setAuthenticatedUser({ id: user.id, referral_code: userInfo?.referral_code });

          const { data: members } = await supabase
            .from('users-info')
            .select('id:user_id, name, email, id')
            .eq('referred_by', userInfo?.referral_code);

          return members as TeamMember[];
        }, { userId: supabase.auth.getUser().then(user => user.data.user?.id) })
        .then(members => {
          if (members) {
            setTeamMembers(members as TeamMember[]);
          }
        });
      } catch (error) {
        console.error("Error fetching team members:", error);
        setError("Failed to load team members");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, [supabase]);

  const addNewMembers = (newMembers: TeamMember[]) => {
    setTeamMembers(prevMembers => [...prevMembers, ...newMembers]);
  };

  return {
    teamMembers,
    authenticatedUser,
    loading,
    error,
    addNewMembers,
  };
}
