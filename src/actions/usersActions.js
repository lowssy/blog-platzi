import axios from 'axios'

import {GET_USERS, LOADING, ERROR} from '../types/usersTypes'

export const getUsers = () => async(dispatch) => {
  try {
    dispatch({
      type: LOADING
    })
    
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')

    dispatch({
      type: GET_USERS,
      payload: response.data
    })
  } catch(err) {
    dispatch({
      type: ERROR,
      payload: err.message
    })
  }
}