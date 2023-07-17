import { createSlice } from '@reduxjs/toolkit'

<<<<<<< HEAD
// export type authState = {
//   authenticated: boolean
//   accessToken: string
// }

export const TOKEN_TIME_OUT = 600 * 1000
=======
export const TOKEN_TIME_OUT = 10 * 1000 // 10초
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081

export const authSlice = createSlice({
  name: 'authToken',
  initialState: {
    authenticated: false,
    accessToken: null,
<<<<<<< HEAD
    //expireTime: null
=======
    expireTime: 0,
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      state.authenticated = true
      state.accessToken = action.payload
<<<<<<< HEAD
      //state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
=======
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081
    },
    DELETE_TOKEN: (state) => {
      state.authenticated = false
      state.accessToken = null
<<<<<<< HEAD
      //state.expireTIme = null;
=======
      state.expireTime = 0
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081
    },
  },
})

export const { SET_TOKEN, DELETE_TOKEN } = authSlice.actions

export default authSlice
