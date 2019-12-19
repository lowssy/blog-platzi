import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Loading from '../Loading'
import Fatal from '../Fatal'

import * as tasksActions from '../../actions/tasksActions'

class AddTask extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  async componentDidMount() {
    const {
      match: {params: {userId, taskId}}
    } = this.props

    if(userId && taskId) {
      const task = this.props.tasks[userId][taskId]
      this.props.changeNewTask(task)
    } else {
      const cleanTask = {
        title: '',
        completed: false
      }

      this.props.changeNewTask(cleanTask)
    }
  }
  
  handleSave() {
    const {
      match: {params: {userId, taskId}}
    } = this.props
    
    let newTask = {
      userId: this.props.match.params.userId,
      ...this.props.newTask
    }

    if(userId && taskId) {
      newTask = {
        ...newTask,
        id: taskId
      }

      this.props.editTask(newTask)
    } else {
      this.props.addTask(newTask)
    }


  }
  
  handleChange(ev) {
    const type = ev.target.getAttribute('type')
    const newTask = {
      title: this.props.newTask.title,
      completed: this.props.newTask.completed
    }

    if(type === 'text') {
      newTask.title = ev.target.value
    } else if(type === 'checkbox') {
      newTask.completed = ev.target.checked
    }

    this.props.changeNewTask(newTask);
  }
  
  render() {
    const {
      match: {params: {userId, taskId}},
      newTask,
    } = this.props

    if(this.props.isLoading) return <Loading />
    if(this.props.error) return <Fatal error={this.props.error} />
    if(this.props.redirect) return <Redirect to='/tasks' />

    return(
      <div className="AddTask">
        <h1>
          {
            (userId && taskId) ? `Update task` : `New task to user ${userId}`
          }
        </h1>
        <br/>
        <div className="form-group">
          task: <input type="text" value={newTask.title} onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          completed: <input type="checkbox" checked={newTask.completed} className="checkbox" onChange={this.handleChange}/>
        </div>
        <br/>
        {
          (userId && taskId) ?
            <button
              disabled={newTask.title === this.props.tasks[userId][taskId].title && newTask.completed === this.props.tasks[userId][taskId].completed}
              className="btn big"
              onClick={this.handleSave}>Save</button>
          :
            <button
              disabled={!newTask.title}
              className="btn big"
              onClick={this.handleSave}>Save</button>
        }
      </div>
    )
  }
}

const mapStateToProps = ({tasksReducer}) => tasksReducer

export default connect(mapStateToProps, tasksActions)(AddTask)