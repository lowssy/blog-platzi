import axios from 'axios'

import {UPDATE_TASKS, SAVE_TASK, LOADING, ERROR, CHANGE_NEW_TASK} from '../types/tasksTypes'

export const getTasks = () => async(dispatch) => {
  try {
    dispatch({
      type: LOADING
    })
    
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos')

    const tasks = {}

    response.data.forEach((task) => {
      tasks[task.userId] = {
        ...tasks[task.userId],
        [task.id]: {
          ...task
        }
      }
    })

    dispatch({
      type: UPDATE_TASKS,
      payload: tasks
    })
  } catch(err) {
    dispatch({
      type: ERROR,
      payload: err.message
    })
  }
}

export const changeNewTask = newTask => dispatch => {
  dispatch({
    type: CHANGE_NEW_TASK,
    payload: newTask
  })
}

export const addTask = newTask => async(dispatch) => {
  try {
    dispatch({
      type: LOADING
    })

    await axios.post('https://jsonplaceholder.typicode.com/todos', newTask)

    dispatch({
      type: SAVE_TASK
    })
  } catch(err) {
    dispatch({
      type: ERROR,
      payload: err
    })
  }
}

export const editTask = editedTask => async(dispatch) => {
  try {
    dispatch({
      type: LOADING
    })

    await axios.put(`https://jsonplaceholder.typicode.com/todos/${editedTask.id}`, editedTask)

    dispatch({
      type: SAVE_TASK
    })
  } catch(err) {
    dispatch({
      type: ERROR,
      payload: err
    })
  }
}

export const changeCompleted = (userId, taskId) => (dispatch, getState) => {
  const {tasks} = getState().tasksReducer
  const selectedTask = tasks[userId][taskId]

  const updatedTasks = {
    ...tasks
  }

  updatedTasks[userId] = {
    ...tasks[userId]
  }

  updatedTasks[userId][taskId] = {
    ...tasks[userId][taskId],
    completed: !selectedTask.completed
  }

  dispatch({
    type: UPDATE_TASKS,
    payload: updatedTasks
  })
}

export const deleteTask = taskId => async(dispatch) => {
  try {
    dispatch({
      type: LOADING
    })

    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${taskId}`)

    dispatch({
      type: UPDATE_TASKS,
      payload: {}
    })
  } catch(err) {
    dispatch({
      type: ERROR,
      payload: err
    })
  }
}