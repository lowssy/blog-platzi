import React, { Component } from 'react'
import { connect } from 'react-redux'

import Table from './Table'
import Loading from '../Loading'
import Fatal from '../Fatal'

import * as usersActions from '../../actions/usersActions'

class Users extends Component {
  async componentDidMount() {
    if(!this.props.users.length) {
      await this.props.getUsers()
    }
  }

  render() {
    if(this.props.isLoading) return <Loading />
    
    if(this.props.error) return <Fatal error={this.props.error} />

    return <Table users={this.props.users} />
  }
}

const mapStateToProps = ({usersReducer}) => usersReducer

export default connect(mapStateToProps, usersActions)(Users)
