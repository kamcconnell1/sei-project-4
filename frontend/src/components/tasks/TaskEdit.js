/* eslint-disable camelcase */
import React from 'react'
import {  useParams } from 'react-router-dom'
import { Grid, Icon, Label, Checkbox, Form  } from 'semantic-ui-react'

import useFetch from '../../utils/useFetch'
import useForm from '../../utils/useForm'
import { getSingleTask, editTask } from '../../lib/api'
import GetDate from '../common/GetDate'
import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import TaskLabels from '../common/TaskLabels'
import { taskCategories } from './TaskCategories'

function TaskEdit() {
  const { id: taskId } = useParams()
  // const history = useHistory()

  // const [state, setState] = React.useState(initialState)
  // const [formErrors, setError] = useState('')
  const { data: task } = useFetch(getSingleTask, taskId)

  const { formData, handleChange, setFormData } = useForm({
    id: '',
    notes: '',
    added_date: '',
    reminder_date: '',
    task_category: '',
    job: {
      company: '',
      job_title: ''
    }
  })

  React.useEffect(() => {
    if (task) {
      setFormData({
        ...task, 
        job: task.job.id,
        task_category: task.task_category.id })
    }
  }, [task, setFormData])

  // const getPageData = async(id) => {
  //   try {
  //     const res = await getSingleTask(id)
  //     console.log(res)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // console.log(task)
  
  //* HandleSubmit event for submitting the login form
  
  const toggleCheckbox = async() => {
    setFormData({ ...formData, completed: !formData.completed })
  }
  
  const selectDopdown = (event, result ) => {
    const { name, value } = result || event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await editTask(formData.id, formData)
      console.log(res, 'edit success')

    } catch (err) {
      // setError(err.response.data )
      console.log(err)
    }
  }

  if (!task) return null 
  const { company, job_title } = task.job
  const { added_date, notes, reminder_date, completed } = formData
  const task_category = task.task_category.name
  const date = GetDate(reminder_date)

  return (

    <div className="TaskEdit">
      <Form
        size='large'
        onSubmit={handleSubmit}
      >
        {/* TASK - HEADER */}
        <Grid celled textAlign='left' verticalAlign='middle' style={{ maxWidth: 900 }} >
          <Grid.Row >
            <Grid.Column width={2}>
              <TaskLabels 
                category={task_category} />
            </Grid.Column>
            <Grid.Column width={1}>
              <Checkbox 
                checked={completed}
                onChange={toggleCheckbox}
              />
            </Grid.Column>
            <Grid.Column width={11} textAlign='right'>
              <p className={completed === true ? 'taskCompleted' : ''}>
                {company}: {job_title}</p>
            </Grid.Column>
            <Grid.Column width={2} textAlign='right'>
              {date}
            </Grid.Column>
          </Grid.Row>

          {/* TASK-CONTENT */}
          <Grid.Row >
            <Grid.Column width={14}>
              <FormInput
                // error={formErrors.first_name}
                fluidIcon='pencil alternate'
                iconPosition='left'
                placeholder='Notes'
                value={notes || ''}
                type='text'
                name='notes'
                onChange={handleChange}
              />
            </Grid.Column>
            <Grid.Column width={2}>
              <FormButton
                // fluidSize='large'
                // color='pink'
                buttonText='Update Task' 
                type='submit'
              ></FormButton>
            </Grid.Column>
          </Grid.Row>

          {/* TASK-FOOTER */}
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon name='calendar alternate' size='large' />
            </Grid.Column>
            <Grid.Column width={7}>
            Added: {added_date}
            </Grid.Column>
            <Grid.Column width={7}>
              <Form.Dropdown
                placeholder='Update Task Type'
                name='task_category'
                options={taskCategories} 
                onChange={selectDopdown}
              />
            </Grid.Column>
            <Grid.Column width={1}>
              <Icon name='trash alternate' size='large' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </div>
  )
}

export default TaskEdit