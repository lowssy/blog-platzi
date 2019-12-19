import {UPDATE_TASKS, SAVE_TASK, LOADING, ERROR, CHANGE_NEW_TASK} from '../types/tasksTypes'

const INITIAL_STATE = {
  tasks: {},
  isLoading: false,
  error: null,
  redirect: false,
  newTask: {
    title: '',
    completed: false
  }
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case UPDATE_TASKS:
      return {...state, tasks: action.payload, isLoading: false, error: null, redirect: false, newTask: {title: '', completed: false}}
    case LOADING:
      return {...state, isLoading: true}
    case ERROR:
      return {...state, error: action.payload, isLoading: false}
    case CHANGE_NEW_TASK:
      return {...state, newTask: {...action.payload}}
    case SAVE_TASK:
      return {...state, tasks: {}, isLoading: false, error: null, redirect: true}
    default:
      return state
  }
}