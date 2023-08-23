import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = import.meta.env.VITE_BASE_URL
//const storage = JSON.parse(localStorage.getItem('persist:root') as string)
//const token = JSON.parse(storage.accessToken)
const access_token = localStorage.getItem('accessToken')

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Bearer ${access_token}`)
    return headers
  },
})

export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery,
  tagTypes: ['Wishlist'],
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: (page: number = 1) => `/my-page/wish-list/${page}`,
      providesTags: [{ type: 'Wishlist', id: 'WISHLIST' }],
    }),
  }),
})

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
export const { useGetWishlistQuery } = wishlistApi
export default wishlistSlice
