/* eslint-disable camelcase */
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import useWindowSize from '../../utils/useWindowSize'
import useForm from '../../utils/useForm'
import useDelete from '../../utils/useDelete'
import { getSingleTask, editTask, deleteTask, getAllJobs } from '../../lib/api'

import GetDate from '../common/GetDate'
import TaskFormMobile from './TaskFormMobile'


function TaskEditMobile() {
  const history = useHistory()
  const { id: taskId } = useParams()
  const { width } = useWindowSize()
  const { deleteItem } = useDelete(deleteTask, taskId, 'tasks')
  const [task, setTask] = React.useState(null)
  const [jobs, setJobs] = React.useState(null)

  // * Function to occur if the page edit has gone through 
  const onSubmitSuccess = () => {
    history.push('/tasks/')
    console.log('success')
    
  }

  // * Values & functions taken from useForm & props passed to useForm
  const { formData, handleChange, setFormData, selectDropdown, handleDateChange, handleSubmit } = useForm({
    id: '',
    completed: '',
    notes: '',
    added_date: '',
    reminder_date: '',
    task_category: '',
    job: ''
  }, editTask, taskId, onSubmitSuccess)

  const getData = async () => {
    try {
      const res = await getSingleTask(taskId)
      const task = res.data
      setTask(task)
      if (!task.job) {
        setFormData({
          ...task,
          task_category: task.task_category.id
        })
      } else {
        setFormData({
          ...task,
          job: task.job.id,
          task_category: task.task_category.id
        })
      }
    } catch (err) {
      console.log(err)
      history.push('/notfound')
    }
  }

  const getJobsData = async () => {
    try {
      const res = await getAllJobs()
      setJobs(res.data)
    } catch (err) {
      console.log(err)
      history.push('/notfound')
    }
  }

  React.useEffect(() => {
    getData()
    getJobsData()
    if (width > 767) {
      history.push('/tasks')
    }
  }, [width])



  const toggleCheckbox = async () => {
    setFormData({ ...formData, completed: !formData.completed })
  }

  const closeForm = () => {
    history.push('/tasks')
  }

  if (!formData) return null
  const { added_date, reminder_date } = formData
  
  if (!task) return null
  
  const dateProvided = () => {
    if (reminder_date) {
      return GetDate(reminder_date)
    } else {
      return GetDate(added_date)
    }
  }
  const date = dateProvided(reminder_date, added_date)
  
  if (!jobs) return null
  const jobOptions = jobs.map((job => {
    return (
      {
        key: `${job.job_title} - ${job.company}`,
        text: `${job.job_title} - ${job.company}`,
        value: job.id
      }
    )
  }))
  
  return (
    <div className='TaskEdit'>
      <TaskFormMobile
        task={task}
        date={date}
        formData={formData}
        closeForm={closeForm}
        toggleCheckbox={toggleCheckbox}
        jobOptions={jobOptions}
        selectDropdown={selectDropdown}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        deleteItem={deleteItem}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default TaskEditMobile