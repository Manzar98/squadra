
import { CustomDropdown, DropdownItem } from "./drop-down"
import { logoutAction } from "@/lib/supabase/auth"
import { useRouter } from "next/navigation"

export default function ProfileDropDownMenu (){
    const router = useRouter()


    const handleProfileSettings = () => {
        router.push("/profile-settings")
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
            trigger={
                <div className="w-15 h-15 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors border border-gray-200">
                    <span className="text-green-500 font-[600] text-[14px]">WM</span>
                </div>
            }
        >
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-gray-200">
                <div className="text-[12px] font-medium text-black uppercase tracking-[2px] mb-1">PRODUCT MANAGER</div>
                <div className="font-semibold text-black text-[1rem] tracking-[0.15px] font-body">Melissa Duck</div>
                <div className="text-sm text-black font-body font-[400] tracking-[0.25px]">melissa.duck@looneytunes.com</div>
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

                <DropdownItem onClick={handleSignOut}>
                    <div className="flex items-center font-body text-[18px] tracking-[0.5px] font-[500]">
                        Sign out
                    </div>
                </DropdownItem>
            </div>
        </CustomDropdown>
    )
}