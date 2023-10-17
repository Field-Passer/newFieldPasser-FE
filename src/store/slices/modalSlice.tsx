import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    isConfirm: false,
    content: [],
    navigateOption: '',
    confirmAction: () => null,
  },
  reducers: {
    SET_MODAL: (state, action) => {
      state.isModalOpen = true
      state.isConfirm = action.payload.isConfirm
      state.content = action.payload.content
      state.navigateOption = action.payload.navigateOption
      state.confirmAction = action.payload.confirmAction
    },
    DELETE_MODAL: (state) => {
      state.isModalOpen = false
      state.isConfirm = false
      state.content = []
      state.navigateOption = ''
      state.confirmAction = () => null
    },
  },
})

export const { SET_MODAL, DELETE_MODAL } = modalSlice.actions
export default modalSlice
