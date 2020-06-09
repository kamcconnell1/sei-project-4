/* eslint-disable camelcase */
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Grid, Icon, Checkbox, Form, Button, Segment } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'

import useFetch from '../../utils/useFetch'
import useForm from '../../utils/useForm'
import useDelete from '../../utils/useDelete'
import { getSingleTask, editTask, deleteTask } from '../../lib/api'
import PageContainer from '../common/PageContainer'
import GetDate from '../common/GetDate'
import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import TaskLabel from '../common/TaskLabel'
import { taskCategories } from './TaskCategories'


function TaskEdit() {
  const history = useHistory()
  const { id: taskId } = useParams()
  const { data: task } = useFetch(getSingleTask, taskId)
  const { deleteItem } = useDelete(deleteTask, taskId, 'tasks')

  
  // * Function to occur if the page edit has gone through 
  const onSubmitSuccess = () => {
    history.push('/tasks/')
  }

  // * Values & functions taken from useForm & props passed to useForm
  const { formData, handleChange, setFormData, selectDropdown, handleDateChange, handleSubmit } = useForm({
    id: '',
    notes: '',
    added_date: '',
    reminder_date: '',
    task_category: '',
    job: {
      company: '',
      job_title: ''
    }
  }, editTask, taskId, onSubmitSuccess)

  //* Funtion to get the information on page load 
  React.useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        job: task.job.id,
        task_category: task.task_category.id
      })
    }
  }, [task, setFormData])

  //* Toggle form checkbox (doesn't update state until submit button pressed)
  const toggleCheckbox = async () => {
    setFormData({ ...formData, completed: !formData.completed })
  }

  if (!task) return null
  if (!task.job) return null
  const { company, job_title } = task.job
  const { added_date, notes, reminder_date, completed } = formData
  const task_category = task.task_category.name
  const date = GetDate(reminder_date)

  return (
    <PageContainer>
      <Form size='large' onSubmit={handleSubmit}>
        <Segment.Group >
          {/* TASK - HEADER */}
          <Grid stackable textAlign='left' verticalAlign='middle'  >

            {/* <Grid.Row  only='mobile'>
              <Segment.Group horizontal>
                <Grid.Column>
                  <Segment ><TaskLabel
                    category={task_category} /></Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment>
                    <Checkbox
                      checked={completed}
                      onChange={toggleCheckbox}
                    />
                  </Segment>
                </Grid.Column>
              </Segment.Group>
            </Grid.Row> */}
          
            <Grid.Row >
              <Grid.Column width={2}>
                <Segment vertical>
                  <TaskLabel
                    category={task_category} />
                </Segment>
              </Grid.Column>
              <Grid.Column width={1}>
                <Segment vertical>
                  <Checkbox
                    checked={completed}
                    onChange={toggleCheckbox}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column width={11} textAlign='right'>
                <Segment vertical>
                  <p className={completed === true ? 'taskCompleted' : ''}>
                    {company}: {job_title}</p>
                </Segment>
              </Grid.Column>
              <Grid.Column width={2} textAlign='right'>
                <Segment vertical>
                  {date}
                </Segment>
              </Grid.Column>
            </Grid.Row>

            {/* TASK-CONTENT */}
            <Grid.Row >
              <Grid.Column width={14}>
                <Segment>
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
                </Segment>
              </Grid.Column>
              <Grid.Column width={2}>
                <Segment>
                  <FormButton
                    // fluidSize='large'
                    color='pink'
                    buttonText='Update'
                    type='submit'
                  ></FormButton>
                </Segment>
              </Grid.Column>
            </Grid.Row>

            {/* TASK-FOOTER */}
            <Grid.Row>
              <Grid.Column width={1}>
                <Segment>
                  <Icon name='calendar alternate' size='large' />
                  
                </Segment>
              </Grid.Column>
              <Grid.Column width={7}>
                <Segment>
                  {/* Added: {added_date} */}
                  Reminder Date: <SemanticDatepicker onChange={handleDateChange}
                    name='reminder_date'
                    format='DD-MM-YYYY'
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column width={6}>
                <Segment>
                  <Form.Dropdown
                    search
                    selection
                    placeholder='Update Task Type'
                    name='task_category'
                    options={taskCategories}
                    onChange={selectDropdown}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column width={2}>
                <Segment>
                  <Button type='button' icon inverted color='red' onClick={deleteItem}>
                    <Icon name='trash alternate' size='large' />
                  </Button>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment.Group>
      </Form>
    </PageContainer>
  )
}

export default TaskEdit