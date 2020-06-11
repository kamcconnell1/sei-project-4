/* eslint-disable camelcase */
import React from 'react'
import { useHistory } from 'react-router-dom'

import { editTask, deleteTask, getAllJobs } from '../../lib/api'

import TaskComputerForm from './TaskComputerForm'

function TaskEditComputer({ closeForm, data, getData }) {
  const history = useHistory()
  const [task, setTask] = React.useState(null)
  const [jobs, setJobs] = React.useState(null)
  const [formData, setFormData] = React.useState(null)
  

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
    if (!data) return 
    setTask(data)
    getJobsData()
    if (!data.job) {
      setFormData({
        ...data,
        task_category: data.task_category.id,
        completed: !data.completed
      })
    } else {
      setFormData({
        ...data,
        job: data.job.id,
        task_category: data.task_category.id,
        completed: !data.completed
      })
    }
  }, [data])

  
  const handleChange = ({ target: { name, value, type, completed } }) => {
    const newValue = (type === 'checkbox' ? completed : value) 
    const updatedFormData = { ...formData, [name]: newValue }
    // const updatedErrors = { ...formErrors, [name]: '' }
    setFormData(updatedFormData)
    // setFormErrors(updatedErrors)
  }

  const selectDropdown = (event, result ) => {
    const { name, value } = result   
    setFormData({ ...formData, [name]: value })
  }

  const handleDateChange = (event, data) => {
    const { name, value } = data 
    const formattedDate = (value) => {
      if (!value) {
        return null
      } else {
        return (new Date(value.getTime() - (value.getTimezoneOffset() * 60000))).toISOString().split('T')[0]
      }
    }
    const date = formattedDate(value)
    console.log(date)
    
    setFormData({ ...formData, [name]: date })
  }

  const toggleCheckbox = async () => {
    setFormData({ ...formData, completed: !formData.completed })
  }

  const handleSubmit = async event => {
    event.preventDefault()  
    try {
      await editTask(formData, task.id)
      closeForm()
      getData()
      console.log('updated') 
    } catch (err) {
      console.log(err)
      // setFormErrors(err.response.data)
    }
  }


  const deleteItem = async () => {
    try {
      await deleteTask(task.id)
      console.log('deleted')
      closeForm()
      getData()
    } catch (err) {
      history.push('/notfound')
    }
  }

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

    <TaskComputerForm
      task={task}
      jobOptions={jobOptions}
      // date={date}
      closeForm={closeForm}
      formData={formData}
      toggleCheckbox={toggleCheckbox}
      selectDropdown={selectDropdown}
      handleChange={handleChange}
      handleDateChange={handleDateChange}
      deleteItem={deleteItem}
      handleSubmit={handleSubmit}
    />
  )
}
export default TaskEditComputer