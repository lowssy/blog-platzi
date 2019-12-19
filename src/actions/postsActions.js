import axios from 'axios'
import {GET_POSTS, UPDATE_POSTS, LOADING, ERROR, LOADING_COMMENTS, ERROR_COMMENTS, UPDATE_COMMENTS} from '../types/postsTypes'
import * as usersTypes from '../types/usersTypes'

export const getPosts = () => async(dispatch) => {
  try {
    dispatch({
      type: LOADING
    })
    
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')

    dispatch({
      type: GET_POSTS,
      payload: response.data
    })
  } catch(err) {
    dispatch({
      type: ERROR,
      payload: err.message
    })
  }
}

export const getUserPosts = (key) => async(dispatch, getState) => {
  try {
    const {users} = getState().usersReducer
    const {posts} = getState().postsReducer
    const userId = users[key].id

    dispatch({
      type: LOADING
    })
    
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    
    const newPosts = response.data.map(post => ({
      ...post,
      comments: [],
      isOpen: false
    }))

    const updatedPosts = [
      ...posts,
      newPosts
    ]
    
    dispatch({
      type: UPDATE_POSTS,
      payload: updatedPosts
    })

    const postsKey = updatedPosts.length - 1
    const updatedUsers = [...users]
    updatedUsers[key] = {
      ...users[key],
      postsKey
    }

    dispatch({
      type: usersTypes.GET_USERS,
      payload: updatedUsers
    })
  } catch(err) {
    dispatch({
      type: ERROR,
      payload: err.message
    })
  }
}

export const togglePost = (postsKey, selectedKey) => async(dispatch, getState) => {
  const {posts} = getState().postsReducer
  const selectedPost = posts[postsKey][selectedKey]

  const newPost = {
    ...selectedPost,
    isOpen: true
  }

  const updatedPosts = [...posts]
  updatedPosts[postsKey] = [
    ...posts[postsKey]
  ]

  updatedPosts[postsKey].forEach(post => {
    post.isOpen = false
  })

  updatedPosts[postsKey][selectedKey] = newPost

  dispatch({
    type: UPDATE_POSTS,
    payload: updatedPosts
  })
}

export const getComments = (postsKey, selectedKey) => async(dispatch, getState) => {
  try {
    const {posts} = getState().postsReducer
    const selectedPost = posts[postsKey][selectedKey]
  
    dispatch({
      type: LOADING_COMMENTS
    })

    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${selectedPost.id}`)
    const newPost = {
      ...selectedPost,
      comments: response.data
    }
  
    const updatedPosts = [...posts]
    updatedPosts[postsKey] = [
      ...posts[postsKey]
    ]
  
    updatedPosts[postsKey][selectedKey] = newPost
  
    dispatch({
      type: UPDATE_COMMENTS,
      payload: updatedPosts
    })
  } catch(err) {
    dispatch({
      type: ERROR_COMMENTS,
      payload: 'Comments couldn\'t be loaded.'
    })
  }
}