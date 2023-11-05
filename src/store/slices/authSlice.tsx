import { createSlice } from '@reduxjs/toolkit'

export const TOKEN_TIME_OUT = 10 * 60 * 1000 // 10분

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
      window.localStorage.setItem('accessToken', action.payload)
    },
    DELETE_TOKEN: (state) => {
      state.authenticated = false
      state.accessToken = null
      state.expireTime = 0
      window.localStorage.removeItem('accessToken')
    },
  },
})

export const { SET_TOKEN, DELETE_TOKEN } = authSlice.actions

export default authSlice
