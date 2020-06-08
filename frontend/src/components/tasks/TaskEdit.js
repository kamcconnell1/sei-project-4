/* eslint-disable camelcase */
import React, { useState } from 'react'
import { Link, Redirect, useHistory, useParams } from 'react-router-dom'
import { Grid, Icon, Label, Checkbox, Form } from 'semantic-ui-react'

import useFetch from '../../utils/useFetch'
import useForm from '../../utils/useForm'
import { getSingleTask, editTask } from '../../lib/api'
import GetDate from '../common/GetDate'
import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import { taskCategories } from './TaskCategories'

function TaskEdit() {
  const { id: taskId } = useParams()
  // const history = useHistory()
  const { data: task } = useFetch(getSingleTask, taskId)
  const [formErrors, setError] = useState('')

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
      setFormData(task )
    }
  }, [task, setFormData])

  //* HandleSubmit event for submitting the login form
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

  const { company, job_title } = formData.job
  const { added_date, notes, reminder_date } = formData
  const task_category = formData.task_category.name
  const date = GetDate(reminder_date)
  console.log(formErrors)
  console.log(formData.id)
  


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
              <Label color='pink'>{task_category}</Label>
            </Grid.Column>
            <Grid.Column width={1}>
              <Checkbox />
            </Grid.Column>
            <Grid.Column width={11} textAlign='right'>
              {company}: {job_title}
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
              <Form.Select
                options={taskCategories} />
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