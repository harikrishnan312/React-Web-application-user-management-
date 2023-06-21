import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userData'
import userList from './userList'
import userEdit from './userEdit'
export const store = configureStore({
  reducer: {
user :userReducer,
users:userList,
edit : userEdit
  }
})