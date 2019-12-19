import {combineReducers} from 'redux'

import usersReducer from './usersReducer'
import postsReducer from './postsReducer'
import tasksReducer from './tasksReducer'

export default combineReducers({
  usersReducer,
  postsReducer,
  tasksReducer
})