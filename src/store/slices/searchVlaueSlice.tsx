import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MyState {
  title: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  district: string[]
  category: string
  chkDate: boolean
}

const initialState: MyState = {
  title: '',
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  startTime: '',
  endTime: '',
  district: [],
  category: '',
  chkDate: false
}

const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    createSearchValue: (state, action: PayloadAction<SearchValueTypes>) => {
      state.title = action.payload.title
      state.startDate = action.payload.startDate
      state.endDate = action.payload.endDate
      state.startTime = action.payload.startTime
      state.endTime = action.payload.endTime
      state.district = action.payload.district
      state.category = action.payload.category
      state.chkDate = action.payload.chkDate
    },
  },
})

export default searchValueSlice
export const { createSearchValue } = searchValueSlice.actions
