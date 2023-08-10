import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MyState {
  comment?: CommentTypes[]
  commentNum?: number
  commentBox?: number
  commentAdd?: number
}

const initialState: MyState = {
  comment: [],
  commentNum: -1,
  commentBox: -1,
  commentAdd: -1,
}

export const commentSlice = createSlice({
  name: 'commentData',
  initialState,
  reducers: {
    setCommentData: (state, action: PayloadAction<MyState>) => {
      state.comment = action.payload.comment
    },
    setCommentInput: (state, action: PayloadAction<MyState>) => {
      state.commentNum = action.payload.commentNum
    },
    setCommentOptions: (state, action: PayloadAction<MyState>) => {
      state.commentBox = action.payload.commentBox
    },
    setCommentAdd: (state, action: PayloadAction<MyState>) => {
      state.commentAdd = action.payload.commentAdd
    },
  },
})

export const { setCommentData, setCommentInput, setCommentOptions, setCommentAdd } = commentSlice.actions
export default commentSlice
