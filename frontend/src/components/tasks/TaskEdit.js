/* eslint-disable camelcase */
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Form } from 'semantic-ui-react'

import useForm from '../../utils/useForm'
import useDelete from '../../utils/useDelete'
import { getSingleTask, editTask, deleteTask } from '../../lib/api'

import GetDate from '../common/GetDate'
import TaskEditMobile from './TaskEditMobile'
import TaskEditComputer from './TaskEditComputer'


function TaskEdit() {
  
  const history = useHistory()
  const { id: taskId } = useParams()
  const { deleteItem } = useDelete(deleteTask, taskId, 'tasks')
  const [task, setTask] = React.useState(null)

  // * Function to occur if the page edit has gone through 
  const onSubmitSuccess = () => {
    history.push('/tasks/')
  }

  // * Values & functions taken from useForm & props passed to useForm
  const { formData, handleChange, setFormData, selectDropdown, handleDateChange, handleSubmit } = useForm({
    id: '',
    completed: '',
    notes: '',
    added_date: '',
    reminder_date: '',
    task_category: '',
    job: {
      company: '',
      job_title: ''
    }
  }, editTask, taskId, onSubmitSuccess)

  const getData = async () => {
    try {
      const res = await getSingleTask(taskId)
      const task = res.data
      setTask(task)
      if (!task.job) {
        setFormData({
          ...task,
          task_category: task.task_category.id,
          completed: !task.completed
        })
      } else {
        setFormData({
          ...task,
          job: task.job.id,
          task_category: task.task_category.id,
          completed: !task.completed
        })
      }
    } catch (err) {
      console.log(err)
      history.push('/notfound')
    }
  }

  React.useEffect(() => {
    getData()
  }, [])


  //* Toggle form checkbox (doesn't update state until submit button pressed)
  const toggleCheckbox = async () => {
    setFormData({ ...formData, completed: !formData.completed })
  }


  if (!formData) return null
  const { added_date, reminder_date } = formData
  if (!task) return null
  console.log(formData.completed)
  

  //! FUNCTION NOT WORKING NOW - COME BACK TO 
  const dateProvided = () => {
    if (reminder_date) {
      return GetDate(reminder_date)
    } else {
      return GetDate(added_date)
    }
  }
  const date = dateProvided(reminder_date, added_date)
  
  return (
    <div className='TaskEdit'>
      <TaskEditMobile 
        task={task}
        date={date}
        formData={formData}
        selectDropdown={selectDropdown}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        deleteItem={deleteItem}
        handleSubmit={handleSubmit}
      />

      {/* <TaskEditComputer
          task={task}
          formData={formData}
          selectDropdown={selectDropdown}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          deleteItem={deleteItem}
          toggleCheckbox={toggleCheckbox}
        /> */}
      {/* </Form> */}
    </div>
  )
}

export default TaskEdit