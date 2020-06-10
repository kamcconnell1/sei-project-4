import React, { useState } from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

import { getAllTasks, getSingleTask, editTask } from '../../lib/api'
import PageContainer from '../common/PageContainer'
import AddButton from '../common/AddButton'
import TaskShow from '../tasks/TaskShow'


function TaskIndex() {
  const history = useHistory()

  const [tasks, setTasks] = React.useState(null)
  const [  , setFormData] = useState('')
  
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
    try {
      const res = await getSingleTask(id)
      const task = res.data
      if (!task.job) {
        const formData = {
          ...task,
          task_category: task.task_category.id,
          completed: !task.completed
        } 
        setFormData(formData)
        handleSubmit(formData, id)
      } else {
        const formData = {
          ...task,
          job: task.job.id,
          task_category: task.task_category.id,
          completed: !task.completed
        }
        setFormData(formData)
        handleSubmit(formData, id)
      }
    } catch (err) {
      history.push('/notfound')
    }
  }

  const handleSubmit = async (formData, id) => {
    try {
      await editTask(formData, id)
      getData()
    } catch (err) {
      console.log(err)
      history.push('/notfound')
    }
  }

  
  //* Separate the tasks between completed & not completed
  if (!tasks) return null
  const sortedTasks = tasks.sort((a, b) => new Date(b.added_date) - new Date(a.added_date))
  
  const filteredTasks = (array, string) => {
    return array.filter(item => {
      return item.completed === string
    })
  }
  const uncompletedTasks = filteredTasks(sortedTasks, false)
  const completedTasks = filteredTasks(sortedTasks, true)
  return (
    <PageContainer>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top' padded={true}>
        <Grid.Column style={{ maxWidth: 900 }}>
          <Header id="header-font" as='h1' color='pink'>Tasks</Header>
          <AddButton color='red' buttonText='Add a new Task' />

          <Header textAlign='left' as='h5'>Still To Complete</Header>
          <hr />
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
          <hr />
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