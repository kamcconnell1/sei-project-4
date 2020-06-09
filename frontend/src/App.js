import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Common imports
import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

// Job imports
import JobIndex from './components/jobs/JobIndex'
import JobShow from './components/jobs/JobShow'
import JobNew from './components/jobs/JobNew'
import JobEdit from './components/jobs/JobEdit'

// Task imports
import TaskIndex from './components/tasks/TaskIndex'
import TaskEdit from './components/tasks/TaskEdit'

// Contact imports
import ContactIndex from './components/contacts/ContactIndex'
import ContactShow from './components/contacts/ContactShow'

// Resources imports
import ResourceIndex from './components/resources/ResourceIndex'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/jobs/new' component={JobNew} />
        <Route path='/jobs/:id/edit' component={JobEdit} />
        <Route path='/jobs/:id' component={JobShow} />
        <Route path='/jobs' component={JobIndex} />
        <Route path='/tasks/:id' component={TaskEdit} />
        <Route path='/tasks' component={TaskIndex} />
        <Route path='/contacts/:id' component={ContactShow} />
        <Route path='/contacts' component={ContactIndex} />
        <Route path='/resources' component={ResourceIndex} />
      </Switch>
    </BrowserRouter>
  )
}

export default App