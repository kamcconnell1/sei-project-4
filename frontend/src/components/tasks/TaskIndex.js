import React from 'react'
import { Grid, Header } from 'semantic-ui-react'

import { getAllTasks } from '../../lib/api'
import PageContainer from '../common/PageContainer'
import TaskShow from '../tasks/TaskShow'

class TaskIndex extends React.Component {
state = {
  tasks: null
}


async componentDidMount() {
  try {
    const res = await getAllTasks()
    this.setState({ tasks: res.data })
  } catch (err){
    console.log(err)
  }
}

render() {

  if (!this.state.tasks) return null 
  return (
    <PageContainer>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top' padded={true}>
        <Grid.Column style={{ maxWidth: 900 }}>
          <Header id="header-font" as='h1' color='pink'>Tasks</Header>
          {this.state.tasks.map(task => (
            <TaskShow
              key={task.id}
              {...task} />
          ))}
        </Grid.Column>
      </Grid>
    </PageContainer>
  )
}
}

export default TaskIndex