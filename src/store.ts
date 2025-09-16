import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Skill {
  id: number
  name: string
}

export interface FlowZone {
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

const flowZonesSlice = createSlice({
  name: 'flowZones',
  initialState: [] as FlowZone[],
  reducers: {
    setFlowZones: (_state, action: PayloadAction<FlowZone[]>) => action.payload,
  },
})



export const { setFlowZones } = flowZonesSlice.actions
export const { setSkills } = skillsSlice.actions
export const selectSkills = (state: RootState) => state.skills
export const selectFlowZones = (state: RootState) => state.flowZones

export const store = configureStore({
  reducer: {
    skills: skillsSlice.reducer,
    flowZones: flowZonesSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
