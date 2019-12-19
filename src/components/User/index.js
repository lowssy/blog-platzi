import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as usersActions from '../../actions/usersActions'
import * as postsActions from '../../actions/postsActions'

import Post from './Post'
import Comments from './Comments'
import Loading from '../Loading'
import Fatal from '../Fatal'

import userImage from '../../assets/user.jpg'
import './style.css'

class User extends Component {
  async componentDidMount() {
    const {
      match: {params: {id}}
    } = this.props

    if(!this.props.usersReducer.users.length) {
      await this.props.getUsers()
    }

    if(this.props.usersReducer.error) {
      return null
    }

    if(!('postsKey' in this.props.usersReducer.users[id])) {
      this.props.getUserPosts(id)
    }
  }

  render() {
    const {
      usersReducer,
      postsReducer,
      match: {params: {id}}
    } = this.props

    if(usersReducer.error) {return <Fatal error={usersReducer.error}/>}
    if(!usersReducer.users.length || usersReducer.isLoading) {return <Loading />}
    
    if(postsReducer.error) {return <Fatal error={postsReducer.error}/>}
    if(postsReducer.isLoading) {return <Loading />}

    const user = usersReducer.users[id]

    if(!postsReducer.posts[user.postsKey]) return null

    
    const posts = postsReducer.posts[user.postsKey]

    return(
      <div className="User">
        <div className="User__info">
          <img src={userImage} alt="Yeah, a Rick mugshot"/>
          <h1>{user.name}</h1>
          <span>{user.email}</span>
        </div>
        <div className="User__posts">
          <h1>posts</h1>

          {
            posts.map((post, selectedKey) => (
              <Post
                post={post}
                key={post.id}
                handleClick={() => this.props.togglePost(user.postsKey, selectedKey)}
              />
            ))
          }
        </div>
        <Comments postsKey={user.postsKey}/>
      </div>
    )
  }
}

const mapStateToProps = ({usersReducer, postsReducer}) => {
  return {
    usersReducer,
    postsReducer
  }
}

const mapDispatchToProps = {
  ...usersActions,
  ...postsActions
}

export default connect(mapStateToProps, mapDispatchToProps)(User)