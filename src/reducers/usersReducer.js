import {GET_USERS, LOADING, ERROR} from '../types/usersTypes'

const INITIAL_STATE = {
  users: [],
  isLoading: false,
  error: null
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_USERS:
      return {...state, users: action.payload, isLoading: false, error: null}
    case LOADING:
      return {...state, isLoading: true}
    case ERROR:
      return {...state, error: action.payload, isLoading: false}
    default:
      return state
  }
}