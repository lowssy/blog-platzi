import React from 'react'
import {connect} from 'react-redux'

import Loading from '../../Loading'
import Fatal from '../../Fatal'
import * as actions from '../../../actions/postsActions'

import './style.css'

const Comments = props => {
  const posts = props.posts[props.postsKey]

  if(props.areCommentsLoading) return <Loading />
  if(props.errorComments) return <Fatal error={props.errorComments} />

  return(
    <div className="Comments">
      <h1>comments</h1>

      {
        posts.map((post, selectedKey) => {
          if(post.isOpen) {
            if(!post.comments.length) {
              props.getComments(props.postsKey, selectedKey)
            } else {
              return (
                <React.Fragment key={props.postsKey}>
                  <h1>to <b>{post.title}</b></h1>
                  
                  {
                    post.comments.map(comment => (
                      <div className="Comment" key={comment.id}>
                      <span>{comment.email}</span>
                        <p>{comment.body}</p>
                      </div>
                    ))
                  }
                </React.Fragment>
              )
            }
          }

          return null
        })
      }
    </div>
  )
}

const mapStateToProps = ({postsReducer}) => postsReducer

export default connect(mapStateToProps, actions)(Comments)