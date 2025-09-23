import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileData } from './types'

export interface Skill {
  id: number
  name: string
}


export interface ProfileState {
  data: ProfileData | null
  loading: boolean
  error: string | null
  lastFetched: number | null
}

const skillsSlice = createSlice({
  name: 'skills',
  initialState: [] as Skill[],
  reducers: {
    setSkills: (_state, action: PayloadAction<Skill[]>) => action.payload,
  },
})

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null,
    loading: false,
    error: null,
    lastFetched: null,
  } as ProfileState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileData>) => {
      state.data = action.payload
      state.error = null
      state.lastFetched = Date.now()
    },
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setProfileError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },
    updateProfileOptimistic: (state, action: PayloadAction<Partial<ProfileData>>) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload }
      }
    },
    clearProfile: (state) => {
      state.data = null
      state.error = null
      state.lastFetched = null
    },
  },
})

export const { setSkills } = skillsSlice.actions
export const { 
  setProfile, 
  setProfileLoading, 
  setProfileError, 
  updateProfileOptimistic, 
  clearProfile 
} = profileSlice.actions

export const selectSkills = (state: RootState) => state.skills
export const selectProfile = (state: RootState) => state.profile

export const store = configureStore({
  reducer: {
    skills: skillsSlice.reducer,
    profile: profileSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
