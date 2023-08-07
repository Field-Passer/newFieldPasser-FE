import { combineReducers, configureStore, Middleware, Dispatch, AnyAction } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import testSlice from './slices/testSlice'
import authReducer from './slices/authSlice'
import searchVlaue from './slices/searchVlaueSlice'
import postData from './slices/postDataSlice'
import infoSlice from './slices/infoSlice'
import wishlistSlice, { wishlistApi } from './slices/wishlistSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

const rootReducer = combineReducers({
  createTest: testSlice.reducer,
  accessToken: authReducer.reducer,
  searchVlaue: searchVlaue.reducer,
  postData: postData.reducer,
  userInfo: infoSlice.reducer,
  wishlist: wishlistSlice.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
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
    }).concat([wishlistApi.middleware as Middleware<Dispatch<AnyAction>, RootState>]),
})

setupListeners(store.dispatch)

export default store
export type ReducerType = ReturnType<typeof rootReducer>
export type AppDispath = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState> // useSelector 타입 지정.
export const persistor = persistStore(store)
