import { createSlice } from '@reduxjs/toolkit'

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlist: [],
  },
  reducers: {
    SET_WISHLIST: (state, action) => {
      state.wishlist = action.payload
    },
  },
})

export const { SET_WISHLIST } = wishlistSlice.actions
export default wishlistSlice
