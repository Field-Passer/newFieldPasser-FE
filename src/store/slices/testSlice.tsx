import { createSlice } from '@reduxjs/toolkit'

const TestSlice = createSlice({
  name: 'createTest',
  initialState: { title: '', contents: '' },
  reducers: {
    createTest: (state, action) => {
      state.title = action.payload.title
      state.contents = action.payload.contents
    },
  },
})

export default TestSlice
