import React, { useState } from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { useHistory, Link } from 'react-router-dom'

import { getAllTasks, getSingleTask, editTask } from '../../lib/api'
import PageContainer from '../common/PageContainer'
import AddButton from '../common/AddButton'
import TaskShow from '../tasks/TaskShow'
import TaskEditComputer from './TaskEditComputer'


function TaskIndex() {
  const history = useHistory()

  const [tasks, setTasks] = React.useState(null)
  const [task, setTask] = React.useState(null)
  const [formVisible, showForm] = React.useState(false)
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
  }, [])

  const closeForm = () => {
    setFormData(null)
    showForm(false)
  }


  //* Function to toggle the add/edit form & set the id to state if editing 
  const toggleForm =  (event) => {   
    event.preventDefault()
    showForm(!formVisible)
    const filterTasks = (tasks, taskId) => {
      return tasks.filter(item => {
        if (item.id === parseInt(taskId)) {
          return item
        }
      })
    }
    const task = filterTasks(tasks, event.currentTarget.value)
    setTask(task[0])
  }

  //* Functions to allow the user to tick the task off as completed 
  const toggleCheckbox = async ({ target: { id } }) => {
    console.log('clicked')
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

  const onClickAdd = () => {
    history.push('/tasks/new')
  }

  //* Separate the tasks between completed & not completed & by most recent first

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
      <div className='TaskIndex'>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top' padded={true}>
          <Grid.Column style={{ maxWidth: 900 }}>
            <div className='task-index-header'>
              <Header id="header-font" as='h1' color='pink'>Tasks</Header>
              {/* <AddButton color='red' buttonText='Add a new Task' onClick={toggleForm} /> */}
              <Link to='/tasks/new/'><AddButton color='red' buttonText='Add a new Task'/></Link>
            </div>

            <div className={formVisible ? 'task-form' : 'task-form-hidden'} >
              <TaskEditComputer
                closeForm={closeForm}
                data={task} 
              />
            </div>


            <Header textAlign='left' as='h5'>Still To Complete</Header>
            <hr />
            <div className='uncompleted-tasks'>
              {uncompletedTasks ?
                uncompletedTasks.map(task => (
                  <TaskShow
                    key={task.id}
                    toggleCheckbox={toggleCheckbox}
                    toggleForm={toggleForm}
                    task={task} />
                )) : '' }
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
                    toggleForm={toggleForm}
                    task={task} /> )) : '' }
            </div>
          </Grid.Column>
        </Grid>
      </div>
    </PageContainer>
  )
}
export default TaskIndex