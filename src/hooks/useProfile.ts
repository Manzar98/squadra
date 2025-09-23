import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { 
  setProfile, 
  setProfileLoading, 
  setProfileError, 
  updateProfileOptimistic,
  selectProfile 
} from '../store'
import { getProfile, updateProfile } from '../lib/supabase/user-service'
import { ProfileData, UpdateFormData } from '../types'
import { getSignedUrl } from '../lib/supabase/storage/client-helper'

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function useProfile() {
  const dispatch = useDispatch<AppDispatch>()
  const profileState = useSelector(selectProfile)
  
  const { data: profile, loading, error, lastFetched } = profileState

  // Check if cache is still valid
  const isCacheValid = lastFetched && (Date.now() - lastFetched) < CACHE_DURATION

  // Convert profile_pic_url path to signed URL on client-side
  const processProfileData = useCallback(async (profileData: ProfileData): Promise<ProfileData> => {
    if (profileData.profile_pic_url && profileData.profile_pic_url.trim()) {
      try {
        // Check if it's already a full URL (shouldn't happen with your setup, but just in case)
        if (profileData.profile_pic_url.startsWith('http')) {
          return profileData
        }
        
        // Convert the stored path to a signed URL
        const signedUrl = await getSignedUrl(profileData.profile_pic_url, "user-uploads")
        return { ...profileData, profile_pic_url: signedUrl }
      } catch (err) {
        console.warn('Failed to generate signed URL for profile image:', err)
        return profileData // Return original data if signed URL fails
      }
    }
    return profileData
  }, [])

  // Fetch profile data with caching
  const fetchProfile = useCallback(async (forceRefresh = false) => {
    // Return cached data if valid and not forcing refresh
    if (isCacheValid && !forceRefresh && profile) {
      return profile
    }

    // Don't fetch if already loading
    if (loading) {
      return profile
    }

    try {
      dispatch(setProfileLoading(true))
      dispatch(setProfileError(null))
      
      const profileData = await getProfile()
      const processedProfileData = await processProfileData(profileData)
      dispatch(setProfile(processedProfileData))
      return processedProfileData
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profile'
      dispatch(setProfileError(errorMessage))
      throw err
    }
  }, [dispatch, isCacheValid, profile, loading, processProfileData])

  // Update profile with optimistic updates
  const updateProfileData = useCallback(async (formData: UpdateFormData) => {
    if (!profile) {
      throw new Error('No profile data available')
    }

    // Process the new profile_pic_url if it exists (convert path to signed URL)
    let processedFormData = formData
    if (formData.profile_pic_url) {
      processedFormData = await processProfileData(formData as ProfileData)
    }

    // Optimistic update - immediately update UI with signed URL
    dispatch(updateProfileOptimistic(processedFormData))

    try {
      // Use original formData (with path) for the API call
      await updateProfile(formData)
      // Refresh profile to ensure consistency
      await fetchProfile(true)
    } catch (err) {
      // Revert optimistic update on error
      dispatch(setProfile(profile))
      throw err
    }
  }, [dispatch, profile, fetchProfile, processProfileData])

  // Auto-fetch on mount if no cached data (client-side only)
  useEffect(() => {
    // Only run on client-side to prevent hydration issues
    if (typeof window !== 'undefined' && !profile && !loading && !error) {
      fetchProfile()
    }
  }, [profile, loading, error, fetchProfile])

  // Get initials for avatar
  const getInitials = useCallback((name?: string) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }, [])

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfileData,
    getInitials,
    isCacheValid,
  }
}
