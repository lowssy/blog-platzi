import React from 'react'

import './style.css'

const Post = props => (
  <div className="Post" onClick={props.handleClick}>
    <h2>{props.post.title}</h2>
    <p>{props.post.body}</p>
  </div>
)

export default Post