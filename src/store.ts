import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TeamMember {
  id: string
  name: string
  email: string
  selected?: boolean
}

const initialTeamMembers: TeamMember[] = [
  { id: '1', name: 'Paul Smith', email: 'jane.teal@email.com', selected: true },
  { id: '2', name: 'Bruce Wayne', email: 'peter@email.com', selected: false },
]

const teamSlice = createSlice({
  name: 'team',
  initialState: initialTeamMembers,
  reducers: {
    addMember: (state: TeamMember[], action: PayloadAction<TeamMember>) => {
      state.push(action.payload)
    },
    setMembers: (state: TeamMember[], action: PayloadAction<TeamMember[]>) => {
      return action.payload
    },
    updateMember: (state: TeamMember[], action: PayloadAction<TeamMember>) => {
      const idx = state.findIndex((m: TeamMember) => m.id === action.payload.id)
      if (idx !== -1) state[idx] = action.payload
    },
    removeMember: (state: TeamMember[], action: PayloadAction<string>) => {
      return state.filter((m: TeamMember) => m.id !== action.payload)
    },
  },
})

export const { addMember, setMembers, updateMember, removeMember } = teamSlice.actions

export const selectTeamMembers = (state: RootState) => state.team

export const store = configureStore({
  reducer: {
    team: teamSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 