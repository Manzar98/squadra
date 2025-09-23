
import { CustomDropdown, DropdownItem } from "./drop-down"
import { logoutAction } from "@/lib/supabase/auth"
import { useRouter } from "next/navigation"
import { useProfile } from "@/hooks/useProfile"

export default function ProfileDropDownMenu (){
    const router = useRouter()
    const { profile, loading, getInitials } = useProfile()


    const handleProfileSettings = () => {
        router.push("/dashboard/profile")
    }
    
    const handleTeamSettings = () => {
        router.push("/team-settings")
    }
    
    const handleGetHelp = () => {
        router.push("/help")
    }
    
    const handleSignOut = async () => {
    
        await logoutAction()
        router.replace("/login")
    }


    return (
        <CustomDropdown
            align="right"
            data-testid="user-avatar"
            trigger={
                <div className="w-15 h-15 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors border border-gray-200">
                    {profile?.profile_pic_url ? (
                        <img 
                            src={profile.profile_pic_url} 
                            alt="Profile" 
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        <span className="text-green-500 font-[600] text-[14px]">
                            {getInitials(profile?.name)}
                        </span>
                    )}
                </div>
            }
        >
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-gray-200">
                <div className="text-[12px] font-medium text-black uppercase tracking-[2px] mb-1">
                    {loading ? 'LOADING...' : (profile?.teamRole || 'USER')}
                </div>
                <div className="font-semibold text-black text-[1rem] tracking-[0.15px] font-body">
                    {loading ? 'Loading...' : (profile?.name || 'User')}
                </div>
                <div className="text-sm text-black font-body font-[400] tracking-[0.25px]">
                    {loading ? 'Loading...' : (profile?.email || 'user@example.com')}
                </div>
            </div>
            {/* Menu Items */}
            <div className="py-1">
                <DropdownItem onClick={handleProfileSettings}>
                    <div className="flex items-center font-body text-[18px] tracking-[0.5px] font-[500]">
                        Profile settings
                    </div>
                </DropdownItem>

                <DropdownItem onClick={handleTeamSettings}>
                    <div className="flex items-center font-body text-[18px] tracking-[0.5px] font-[500]">
                        Team settings
                    </div>
                </DropdownItem>

                <DropdownItem onClick={handleGetHelp}>
                    <div className="flex items-center font-body text-[18px] tracking-[0.5px] font-[500]">
                        Get help
                    </div>
                </DropdownItem>

                <DropdownItem onClick={handleSignOut} data-testid="sign-out" >
                    <div className="flex items-center font-body text-[18px] tracking-[0.5px] font-[500]">
                        Sign out
                    </div>
                </DropdownItem>
            </div>
        </CustomDropdown>
    )
}