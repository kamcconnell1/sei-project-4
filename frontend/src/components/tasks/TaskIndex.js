import React, { useState } from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

import { getAllTasks, getSingleTask, editTask } from '../../lib/api'
import PageContainer from '../common/PageContainer'
import TaskShow from '../tasks/TaskShow'


function TaskIndex() {
  const history = useHistory()

  const [tasks, setTasks] = React.useState(null)
  const [ , setFormData] = useState('')
  
  const getData = async () => {
    try {
      const res = await getAllTasks()
      setTasks(res.data)
    } catch (err) {
      console.log(err)
      history.push('/notfound')
    }
  }

  React.useEffect(() => {
    getData()
  }, [] )


  const toggleCheckbox = async ({ target: { id } }) => {
    console.log('toggled, clicked on', id)
    try {

      const res = await getSingleTask(id)
      const task = res.data
      const formData = {
        ...task,
        job: task.job.id,
        task_category: task.task_category.id,
        completed: !task.completed
      }
      setFormData(formData)
      handleSubmit(id, formData)
    } catch (err) {
      history.push('/notfound')
    }
  }

  const handleSubmit = async (id, formData) => {
    try {
      await editTask(id, formData)
      getData()
    } catch (err) {
      console.log(err)
      history.push('/notfound')
    }
  }

  
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
          <Header textAlign='left' as='h5'>Still To Complete</Header>
          <div className='uncompleted-tasks'>
            {uncompletedTasks ?
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
          <Header textAlign='left' as='h5' color='grey'>Completed</Header>
          <div className='completed-tasks'>
            {completedTasks ?
              completedTasks.map(task => (
                <TaskShow
                  key={task.id}
                  toggleCheckbox={toggleCheckbox}
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