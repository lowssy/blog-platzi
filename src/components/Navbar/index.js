import React from 'react'
import {Link} from 'react-router-dom'

import './style.css'
import logo from '../../assets/logo.png'

const Navbar = () => (
  <nav className="Navbar">
    <img src={logo} alt="Platzi"/>
    <Link to='/users'>Users</Link>
    <Link to='/tasks'>Tasks</Link>
  </nav>
)

export default Navbar