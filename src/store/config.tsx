import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import testSlice from './slices/testSlice'
import authReducer from './slices/authSlice'
import searchVlaue from './slices/searchVlaueSlice'
import postData from './slices/postDataSlice'

const rootReducer = combineReducers({
  createTest: testSlice.reducer,
  accessToken: authReducer.reducer,
  searchVlaue: searchVlaue.reducer,
  postData: postData.reducer,
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
