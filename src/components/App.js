import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Users from './Users'
import User from './User'
import Navbar from './Navbar'
import NotFound from './NotFound'
import Tasks from './Tasks'
import AddTask from './AddTask'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <div className="Layout">
      <Switch>
        <Route exact path='/users' component={Users}/>
        <Route exact path='/tasks' component={Tasks} />
        <Route exact path='/user/:id' component={User} />
        <Route exact path='/tasks/add/:userId' component={AddTask} />
        <Route exact path='/tasks/edit/:userId/:taskId' component={AddTask} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default App