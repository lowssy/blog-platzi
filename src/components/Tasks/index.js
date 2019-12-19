import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import Loading from '../Loading'
import Fatal from '../Fatal'

import './style.css'
import * as tasksActions from '../../actions/tasksActions'

class Tasks extends Component {
  async componentDidMount() {
    if(!Object.keys(this.props.tasks).length) {
      await this.props.getTasks()
    }
  }

  async componentDidUpdate() {
    if(!Object.keys(this.props.tasks).length && !this.props.isLoading) {
      await this.props.getTasks()
    }
  }

  render() {
    if(this.props.isLoading) return <Loading />
    if(this.props.error) return <Fatal error={this.props.error} />

    return(
      <div className="Tasks">
        {
          Object.keys(this.props.tasks).map(userId => (
            <div className="Tasks__user" key={userId}>
              <h2 onClick={() => {this.props.toggleUsertasks(userId)}}>User {userId}</h2>

              <div className="User__tasks">
                {
                  Object.keys(this.props.tasks[userId]).map(taskId => (
                    <div className="Task" key={taskId}>
                      <button className="btn__option delete" onClick={() => {this.props.deleteTask(taskId)}}>✂</button>
                      <Link to={`/tasks/edit/${userId}/${taskId}`} className="btn__option edit">
                        ✎
                      </Link>
                      <input
                        type="checkbox"
                        checked={this.props.tasks[userId][taskId].completed}
                        onChange={() => {this.props.changeCompleted(userId, taskId)}}
                        className="checkbox"
                        />
                      {
                        this.props.tasks[userId][taskId].title
                      }
                    </div>
                  ))
                }
              </div>
              <Link to={`/tasks/add/${userId}`} className="btn">
                Add task
              </Link>
            </div>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = ({tasksReducer}) => tasksReducer

export default connect(mapStateToProps, tasksActions)(Tasks)