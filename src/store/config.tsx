import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import testSlice from './slices/testSlice'
import authReducer from './slices/authSlice'
import searchVlaue from './slices/searchVlaueSlice'
import postData from './slices/postDataSlice'
import infoSlice from './slices/infoSlice'
import wishlistSlice from './slices/wishlistSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import searchBox from './slices/searchChkSlice'
import commentData from './slices/commentSlice'
import modal from './slices/modalSlice'
import sidebar from './slices/sidebarSlice'

const rootReducer = combineReducers({
  createTest: testSlice.reducer,
  accessToken: authReducer.reducer,
  searchVlaue: searchVlaue.reducer,
  postData: postData.reducer,
  userInfo: infoSlice.reducer,
  wishlist: wishlistSlice.reducer,
  searchBox: searchBox.reducer,
  commentData: commentData.reducer,
  modal: modal.reducer,
  sidebar: sidebar.reducer,
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

setupListeners(store.dispatch)

export default store
export type ReducerType = ReturnType<typeof rootReducer>
export type AppDispath = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)
