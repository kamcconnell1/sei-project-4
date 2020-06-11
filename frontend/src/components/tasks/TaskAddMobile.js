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
    <div className='TaskAddMobile'>
      <Form size='large' onSubmit={handleSubmit}>
        <Grid stackable textAlign='left' verticalAlign='middle'  >
          <Grid.Row only='mobile'>
            <Grid.Column>
              <Header as='h1' textAlign='center'>Add Task</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row only='mobile'>
            <Grid.Column >
              <Segment className='row1'>
                <div className='task-title'>
                  <Header as='small' textAlign='center'><Icon name='tag' color='grey' size='mini'/>Task</Header>
                </div>
                <div className='task-category'>
                  <Dropdown
                    search
                    clearable
                    selection
                    placeholder={formData.task_category}
                    name='task_category'
                    options={taskCategories}
                    onChange={selectDropdown}
                  />
                </div>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row only='mobile'>
            <Grid.Column >
              <Header size='small'>Related Job</Header>
              <Segment className='row2'>
                <Dropdown
                  search
                  placeholder='Select applicable job...'
                  value={formData.job || ''}
                  name='job'
                  className='fluid'
                  selection
                  options={jobOptions}
                  onChange={selectDropdown}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row only='mobile'>
            <Grid.Column >
              <Header size='small'>Notes</Header>
              <div className='row3'>
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
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row only='mobile'>
            <Grid.Column >
              <Header size='small'>Update Reminder</Header>
              <Segment className='row4'>
                <div className='date-picker'>
                  <SemanticDatepicker onChange={handleDateChange}
                    datePickerOnly
                    clearable
                    iconPosition='left'
                    pointing='right'
                    name='reminder_date'
                    format='DD-MM-YYYY'
                    value={formData.reminder_date ? new Date(formData.reminder_date) : null}
                  />
                </div>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row only='mobile'>
            <Grid.Column>
              <Segment className='row5'>
                <div className='update-btn'>
                  <FormButton
                    // fluidSize='large'
                    color='pink'
                    buttonText='Add Task'
                    type='submit'
                  ></FormButton>
                </div>
              </Segment>
            </Grid.Column>
          </Grid.Row> 
        </Grid>
      </Form>
    </div>
  )
}
export default TaskAddMobile