import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import testSlice from './slices/testSlice'
import authReducer from './slices/authSlice'
<<<<<<< HEAD
import searchVlaue from './slices/searchVlaueSlice'
import postData from './slices/postDataSlice'
=======
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081

const rootReducer = combineReducers({
  createTest: testSlice.reducer,
  accessToken: authReducer.reducer,
<<<<<<< HEAD
  searchVlaue: searchVlaue.reducer,
  postData: postData.reducer,
=======
>>>>>>> c4172c5f32dfc6119adbfa7947f5ed9c01916081
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
export type RootState = ReturnType<typeof store.getState> // useSelector 타입 지정.
export const persistor = persistStore(store)
