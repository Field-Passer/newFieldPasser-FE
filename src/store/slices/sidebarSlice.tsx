import { createSlice } from '@reduxjs/toolkit'

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isSidebarOpen: false,
  },
  reducers: {
    OPEN_SIDEBAR: (state) => {
      state.isSidebarOpen = true
    },
    CLOSE_SIDEBAR: (state) => {
      state.isSidebarOpen = false
    },
  },
})

export const { OPEN_SIDEBAR, CLOSE_SIDEBAR } = sidebarSlice.actions
export default sidebarSlice
