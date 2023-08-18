import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MyState {
  openBox: boolean
}

const initialState: MyState = {
  openBox: false,
}

const searchChkSlice = createSlice({
  name: 'searchBox',
  initialState,
  reducers: {
    cheakOpenBox: (state, action: PayloadAction<MyState>) => {
      state.openBox = action.payload.openBox
    },
  },
})

export default searchChkSlice
export const { cheakOpenBox } = searchChkSlice.actions
