import React from 'react'
import {Link, Redirect} from 'react-router-dom'

import './style.css'
import portal from '../../assets/portal.png'

const NotFound = props => {
  if(props.match.path === '/') return <Redirect to='/users' />

  return(
    <div className="NotFound">
      <h1>Oops! {props.error}</h1>
      <p>You're lost, you might use your portal gun to go back</p>
      <Link to="/">
        <div className="NotFound__portal">
          <img src={portal} alt="Portal"/>
        </div>
      </Link>
    </div>
  )
}

export default NotFound