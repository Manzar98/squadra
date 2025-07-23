import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Skill {
  id: number
  name: string
}

const skillsSlice = createSlice({
  name: 'skills',
  initialState: [] as Skill[],
  reducers: {
    setSkills: (_state, action: PayloadAction<Skill[]>) => action.payload,
  },
})

export const { setSkills } = skillsSlice.actions
export const selectSkills = (state: RootState) => state.skills

export const store = configureStore({
  reducer: {
    skills: skillsSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
