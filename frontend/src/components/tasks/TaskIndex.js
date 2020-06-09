import React from 'react'
import { Grid, Header } from 'semantic-ui-react'

import useFetch from '../../utils/useFetch'
import { getAllTasks } from '../../lib/api'
import PageContainer from '../common/PageContainer'
import TaskShow from '../tasks/TaskShow'

function TaskIndex() {
  const { data: tasks } = useFetch(getAllTasks)
  

  const toggleCheckbox = async ({ target: { name, value } }) => {
    // setFormData({ ...formData, completed: !formData.completed })
    console.log('toggled, clicked on', value)
    console.log(name)
    

    
  }

  // console.log(tasks)




  //* Separate the tasks between completed & not completed
  const filteredTasks = (array, string) => {
    return array.filter(item => {
      return item.completed === string
    })
  }
  if (!tasks) return null
  const uncompletedTasks = filteredTasks(tasks, false)
  const completedTasks = filteredTasks(tasks, true)

  return (
    <PageContainer>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top' padded={true}>
        <Grid.Column style={{ maxWidth: 900 }}>
          <Header id="header-font" as='h1' color='pink'>Tasks</Header>
          <Header  textAlign='left' as='h5'>Still To Complete</Header>
          <div className='uncompleted-tasks'>
            { uncompletedTasks ? 
              uncompletedTasks.map(task => (
                <TaskShow
                  key={task.id}
                  toggleCheckbox={toggleCheckbox}
                  {...task} />
              ))
              :
              ''
            }
          </div>
          <br />
          <Header  textAlign='left' as='h5' color='grey'>Still To Complete</Header>
          <div className='completed-tasks'>
            { completedTasks ? 
              completedTasks.map(task => (
                <TaskShow
                  key={task.id}
                  {...task} />
              ))
              :
              ''
            }
          </div>
        </Grid.Column>
      </Grid>
    </PageContainer>
  )
}

export default TaskIndex