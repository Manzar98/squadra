"use client"

import { useEffect, useState } from "react"
import ProfileDropDownMenu from "./profile-dropdown-menu"
import { CustomDropdown, DropdownItem } from "./drop-down"
import InputField from "./ui/input-field"
import { TEAM_ROLES } from "@/constants/team-roles"
import { Button } from "./ui/button"
import FileUpload from "./file-upload"
import { useToast } from "./ui/toast"
import { useProfile } from "@/hooks/useProfile"

export default function ProfileComponent() {
	const toast = useToast()
	const { profile, updateProfileData, loading: profileLoading } = useProfile()
	// const [isRoleError, isSetRoleError] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [fileUploadedUrl, setFileUploadedUrl] = useState("")
	const [formData, setFormData] = useState({
		name: "",
		teamRole: "",
		phone_number: "",
		thingsYouLike: [] as string[],
	})

	// Load profile data into form when profile is available
	useEffect(() => {
		if (profile) {
			setFormData({
				name: profile.name || "",
				teamRole: profile.teamRole || "",
				phone_number: profile.phone_number || "",
				thingsYouLike: profile.thingsYouLike || [],
			})
			setFileUploadedUrl(profile.profile_pic_url || "")
		}
	}, [profile])

	const handleInputChange = (field: keyof typeof formData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }))
	}

	const ThingsYouLike = [
		"Thinking through problems",
		"Challenging yourself",
		"Helping others",
		"Brainstorming ideas",
		"Unlearn  what I thought I knew and challenge myself in different ways",
		"Planning things carefully",
	]

	const handleSubmit = async () => {
		const { thingsYouLike, name, phone_number, teamRole } = formData
		setIsSubmitting(true)

		if (!name || !thingsYouLike || !teamRole) {
			toast.error("Missing Fields", "Please complete all required fields.")
			setIsSubmitting(false)
			return
		}

		try {
			await updateProfileData({
				name,
				teamRole,
				phone_number,
				thingsYouLike,
				profile_pic_url: fileUploadedUrl, // save uploaded avatar path
			})
			toast.success("Profile Successful!", "Profile has been updated")
		} catch (error: unknown) {
			console.error("Update failed", error)
			const message =
				error instanceof Error && error.message
					? error.message
					: "Something went wrong. Please try again."
			toast.error("Update Failed", message)
		} finally {
			setIsSubmitting(false)
		}
	}


	return (
		<div className="mt-22 xl:mt-0 flex flex-1 flex-col px-4 sm:px-6 lg:px-8 pb-10 justify-center">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-5 mb-5">
				<h4 className="text-xl sm:text-2xl lg:text-[34px] font-[600] text-gray-900 tracking-[0.25px] mb-3 sm:mb-0">
					Edit personal profile
				</h4>
				<div className="hidden lg:flex">
					<ProfileDropDownMenu />
				</div>
			</div>

			{/* Card */}
			<div className="bg-white w-full h-full flex flex-col rounded-[6px] border border-gray-200 p-4 sm:p-6">
				{/* Grid / Stack */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Left column */}
					<div className="max-w-lg">
						<InputField
							type="text"
							dataTestId={"name"}
							label="Name"
							placeholder="Name"
							value={formData.name}
							onChange={(val) => handleInputChange("name", val)}
							required
						/>

						{/* Team Role Dropdown */}
						<div className="space-y-2 mt-4">
							<label className="text-sm md:text-base font-semibold text-[#5B5C5B]">Team role</label>
							<CustomDropdown
								align="left"
								trigger={
									<div className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer bg-white flex items-center justify-between">
										<span className={formData.teamRole ? "text-gray-900" : "text-gray-500"}>
											{formData.teamRole || "Select your role"}
										</span>
										<svg
											className="w-4 h-4 text-gray-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
										</svg>
									</div>
								}
							>
								{TEAM_ROLES.map((role) => (
									<DropdownItem key={role} onClick={() => handleInputChange("teamRole", role)}>
										{role}
									</DropdownItem>
								))}
							</CustomDropdown>
							{/* {isRoleError && <p className="text-xs text-red-500">Please select your role</p>} */}
						</div>

						{/* Phone */}
						<div className="mt-5">
							<InputField
								type="phone"
								dataTestId={"phone-number"}
								label="Phone Number"
								placeholder="0232 312323"
								value={formData.phone_number}
								onChange={(val) => handleInputChange("phone_number", val)}
								required
							/>
						</div>
					</div>

					{/* Right column (avatar) */}
					<div className="flex justify-start lg:ml-6 mt-8">
						<FileUpload
							value={fileUploadedUrl} // path from DB
							onUploadComplete={(path) => setFileUploadedUrl(path)}
						/>
					</div>
				</div>

				{/* Things you like */}
				<div className="flex flex-col mb-10 mt-10">
					<label className="block text-[16px] text-left font-[600] text-[#5B5C5B] mb-2 font-body">
						Things you like to do
					</label>
					<div className="flex flex-wrap gap-3">
						{ThingsYouLike.map((thingsYouLike) => {
							const selected = formData.thingsYouLike.includes(thingsYouLike)
							const reachedMax = formData.thingsYouLike.length >= 3
							return (
								<Button
									key={thingsYouLike}
									data-testid={"reaction"}
									onClick={() => {
										const exists = formData.thingsYouLike.includes(thingsYouLike)
										if (!exists && formData.thingsYouLike.length >= 3) return
										setFormData({
											...formData,
											thingsYouLike: exists
												? formData.thingsYouLike.filter((t) => t !== thingsYouLike)
												: [...formData.thingsYouLike, thingsYouLike],
										})
									}}
									className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 text-sm sm:text-base font-body font-[500] transition-colors ${selected
										? "bg-green-50 text-green-500 border-green-500"
										: `${reachedMax ? "opacity-50 cursor-not-allowed" : ""} bg-white text-gray-700 border-gray-300 hover:border-gray-400`
										}`}
								>
									{thingsYouLike}
								</Button>
							)
						})}
					</div>
				</div>

				{/* Footer buttons */}
				<div className="flex flex-col sm:flex-row justify-end gap-4 sm:gap-6 mb-6">
					{/* Cancel */}
					<button
						type="button"
						className="text-green-600 font-bold text-sm tracking-[0.5px] hover:underline"
					>
						CANCEL
					</button>

					{/* Save */}
					<Button
						data-testid="submit"
						onClick={handleSubmit}
						isLoading={isSubmitting}
						className="w-full sm:w-[200px] h-[42px] bg-green-500 hover:bg-green-600 font-bold text-sm rounded-full tracking-[0.5px]"
					>
						SAVE CHANGES
					</Button>
				</div>
			</div>
		</div>
	)
}
