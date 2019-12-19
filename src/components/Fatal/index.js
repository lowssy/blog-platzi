import React from 'react'

import './style.css'

const Fatal = props => (
  <div className="Fatal">
    <h1>Oops! Something went wrong</h1>
    <p>{props.error}</p>
  </div>
)

export default Fatal