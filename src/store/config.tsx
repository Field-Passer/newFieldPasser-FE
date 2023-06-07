import { configureStore } from '@reduxjs/toolkit'
import testSlice from './slices/testSlice'

const store = configureStore({
  reducer: {
    createTest: testSlice.reducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState> // useSelector 타입 지정.
