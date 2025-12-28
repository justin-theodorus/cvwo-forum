import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import topicReducer from './topicSlice'
import postReducer from './postSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    topics: topicReducer,
    posts: postReducer
  }
})

export type RootState = ReturnType<typeof store.getState> // type of store
export type AppDispatch = typeof store.dispatch // type of action (function sent to store)

