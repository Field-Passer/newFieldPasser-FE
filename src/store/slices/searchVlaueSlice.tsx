import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MyState {
  title: string
  date: string
  startTime: string
  endTime: string
  district: string[]
  category: string
}

const initialState: MyState = {
  title: '',
  date: new Date().toISOString(),
  startTime: '',
  endTime: '',
  district: [''],
  category: '',
}

const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    createSearchValue: (state, action: PayloadAction<SearchValueTypes>) => {
      state.title = action.payload.title
      state.date = action.payload.date
      state.startTime = action.payload.startTime
      state.endTime = action.payload.endTime
      state.district = action.payload.district
      state.category = action.payload.category
    },
  },
})

export default searchValueSlice
export const { createSearchValue } = searchValueSlice.actions
