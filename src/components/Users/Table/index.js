import React from 'react'
import {Link} from 'react-router-dom'

import './style.css'

const Table = props => (
  <div className="Table">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Website</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user, key) => (
          <tr key={key}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.website}</td>
            <td><Link to={`/user/${key}`}><i className="profile icon"></i></Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default Table