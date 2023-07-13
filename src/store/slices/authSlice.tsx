import { createSlice } from '@reduxjs/toolkit'

export const TOKEN_TIME_OUT = 10 * 1000 // 10초

export const authSlice = createSlice({
  name: 'authToken',
  initialState: {
    authenticated: false,
    accessToken: null,
    expireTime: 0,
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      state.authenticated = true
      state.accessToken = action.payload
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT
    },
    DELETE_TOKEN: (state) => {
      state.authenticated = false
      state.accessToken = null
      state.expireTime = 0
    },
  },
})

export const { SET_TOKEN, DELETE_TOKEN } = authSlice.actions

export default authSlice
