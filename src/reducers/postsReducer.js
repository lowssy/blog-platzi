import {GET_POSTS, UPDATE_POSTS, LOADING, ERROR, LOADING_COMMENTS, ERROR_COMMENTS, UPDATE_COMMENTS} from '../types/postsTypes'

const INITIAL_STATE = {
  posts: [],
  isLoading: false,
  error: null,
  areCommentsLoading: false,
  errorComments: null
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_POSTS:
      return {...state, posts: action.payload, isLoading: false, error: null}
    case UPDATE_POSTS:
      return {...state, posts: action.payload, isLoading: false, error: null}
    case LOADING:
      return {...state, isLoading: true}
    case ERROR:
      return {...state, error: action.payload, isLoading: false}
    case LOADING_COMMENTS:
      return {...state, areCommentsLoading: true}
    case ERROR_COMMENTS:
      return {...state, errorComments: action.payload, areCommentsLoading: false}
    case UPDATE_COMMENTS:
      return {...state, posts: action.payload, areCommentsLoading: false, errorComments: null}
    default:
      return state
  }
}