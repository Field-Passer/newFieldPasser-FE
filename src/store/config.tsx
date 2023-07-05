import { configureStore } from '@reduxjs/toolkit'
import testSlice from './slices/testSlice'
import authReducer from './slices/authSlice'

const store = configureStore({
  reducer: {
    createTest: testSlice.reducer,
    accessToken: authReducer.reducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState> // useSelector 타입 지정.
