import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: POST_TYPE[] = []

const postDataSlice = createSlice({
  name: 'postData',
  initialState,
  reducers: {
    createPostData: (state, action: PayloadAction<POST_TYPE[]>) => {
      state = action.payload
    },
  },
})

export default postDataSlice
export const { createPostData } = postDataSlice.actions
