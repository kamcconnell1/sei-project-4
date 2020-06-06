import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Common imports
import Home from './components/common/Home'
import Login from './components/auth/Login'
import Navbar from './components/common/Navbar'

// Job imports
import JobIndex from './components/jobs/JobIndex'
import JobShow from './components/jobs/JobShow'

// Task imports
import TaskIndex from './components/tasks/TaskIndex'
import TaskShow from './components/tasks/TaskShow'

// Contact imports
import ContactIndex from './components/contacts/ContactIndex'
import ContactShow from './components/contacts/ContactShow'

// Resources imports
import ResourcesIndex from './components/resources/ResourcesIndex'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/jobs/:id' component={JobShow} />
        <Route path='/jobs' component={JobIndex} />
        <Route path='/tasks/:id' component={TaskShow} />
        <Route path='/tasks' component={TaskIndex} />
        <Route path='/contacts/:id' component={ContactShow} />
        <Route path='/contacts' component={ContactIndex} />
        <Route path='/resources' component={ResourcesIndex} />
      </Switch>
    </BrowserRouter>
  )
}

export default App