import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  memberId: '',
  memberName: '',
  memberNickName: '',
  role: '',
  memberPhone: '',
}

export const infoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    SET_INFO: (state, action) => {
      state.memberId = action.payload.memberId
      state.memberName = action.payload.memberName
      state.memberNickName = action.payload.memberNickName
      state.role = action.payload.role
      state.memberPhone = action.payload.memberPhone
    },
    DELETE_INFO: (state) => {
      console.log(state)
      state = initialState
    },
  },
})

export const { SET_INFO, DELETE_INFO } = infoSlice.actions

export default infoSlice
