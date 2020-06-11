import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Grid, Icon, Header, Segment, Dropdown } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'

import useForm from '../../utils/useForm'
import { getAllJobs, addNewTask } from '../../lib/api'
import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import { taskCategories } from './TaskCategories'
import useWindowSize from '../../utils/useWindowSize'



function TaskAddMobile() {
  const history = useHistory()
  const [jobs, setJobs] = React.useState(null)
  const { width } = useWindowSize()

  const onSubmitSuccess = () => {
    console.log('added')
    history.push('/tasks')
  }

  const { formData, handleChange, selectDropdown, handleDateChange, handleSubmit } = useForm({
    title: '',
    completed: false,
    notes: '',
    task_category: '',
    job: ''
  }, addNewTask, null, onSubmitSuccess)

  const getData = async () => {
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
    if (width > 767) history.push('/tasks/')
  }, [width])

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
    <Segment.Group className='TaskFormMobile'>
      <Segment>
        <Form size='large' onSubmit={handleSubmit}>
          <Grid stackable textAlign='left' verticalAlign='middle'  >
            <Grid.Row only='mobile'>
              <Grid.Column>
                <Header as='h1' id='header-font-tasks' textAlign='center'>Add Task</Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only='mobile' className='row1'>
              <Grid.Column >
                <Header size='small'>Task Category</Header>
                <Form.Field >
                  <Dropdown
                    search
                    clearable
                    selection
                    placeholder='Task Category'
                    name='task_category'
                    options={taskCategories}
                    onChange={selectDropdown}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only='mobile' className='row2'>
              <Grid.Column >
                <Header size='small'>Related Job</Header>
                <Form.Field >
                  <Dropdown
                    search
                    clearable
                    placeholder='Select applicable job...'
                    value={formData.job || ''}
                    name='job'
                    className='fluid'
                    selection
                    options={jobOptions}
                    onChange={selectDropdown}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only='mobile' className='row3'>
              <Grid.Column >
                <Header size='small'>Notes</Header>
                <Form.Field >
                  <FormInput
                  // error={formErrors.first_name}
                    size='big'
                    fluidIcon='pencil alternate'
                    iconPosition='left'
                    placeholder='Notes'
                    value={formData.notes}
                    type='text'
                    name='notes'
                    onChange={handleChange}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only='mobile' className='row4'>
              <Grid.Column >
                <Header size='small'>Update Reminder</Header>
                <Form.Field >
                  <SemanticDatepicker onChange={handleDateChange}
                    datePickerOnly
                    clearable
                    iconPosition='left'
                    pointing='right'
                    name='reminder_date'
                    format='DD-MM-YYYY'
                    value={formData.reminder_date ? new Date(formData.reminder_date) : null}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only='mobile'>
              <Grid.Column>
                <FormButton
                  fluidSize='large'
                  buttonText='Add Task'
                  type='submit'
                ></FormButton>
              </Grid.Column>
            </Grid.Row> 
          </Grid>
        </Form>
      </Segment>
    </Segment.Group>
  )
}
export default TaskAddMobile