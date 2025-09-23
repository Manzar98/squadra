// Example component showing how to use the profile hook in other components
"use client"

import { useProfile } from "@/hooks/useProfile"

export default function ProfileExample() {
  const { profile, loading, error, getInitials } = useProfile()

  if (loading) {
    return <div>Loading profile...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!profile) {
    return <div>No profile data available</div>
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Profile Information</h3>
      <div className="space-y-2">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.teamRole}</p>
        <p><strong>Phone:</strong> {profile.phone_number || 'Not provided'}</p>
        <p><strong>Initials:</strong> {getInitials(profile.name)}</p>
        {profile.profile_pic_url && (
          <img 
            src={profile.profile_pic_url} 
            alt="Profile" 
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
      </div>
    </div>
  )
}
