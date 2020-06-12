import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Grid,  Header, Dropdown, Segment, Icon } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'


import useForm from '../../utils/useForm'
import { getAllJobs, addNewTask } from '../../lib/api'
import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import { taskCategories } from './TaskCategories'


function TaskAddComputer({ closeForm, getData }) {
  
  const history = useHistory()
  const [jobs, setJobs] = React.useState(null)

  const onSubmitSuccess = () => {
    console.log('added')
    closeForm()
    getData()
  }

  const { formData, handleChange, formErrors, selectDropdown, handleDateChange, handleSubmit } = useForm({
    title: '',
    completed: false,
    notes: '',
    task_category: '',
    job: ''
  }, addNewTask, null, onSubmitSuccess)

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
    getJobsData()
  }, [])

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
    <div className='TaskAddComputer'>
      <Segment.Group>
        <Segment>
          <Form size='large' onSubmit={handleSubmit}>
            <Grid className='edit-task-computer-tablet'>
              <Grid.Row only='tablet computer'>
                <Grid.Column width={1}>
                  <button className='btn-not-displayed'
                    type ='button' onClick={closeForm} >
                    <Icon name='close'  />
                  </button>
                </Grid.Column>
                <Grid.Column width={15}>
                  <Header as='h1' id='header-font-tasks'textAlign='center'>Add Task</Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row only='tablet computer' className='row1'>
                <Grid.Column width={5}>
                  <Form.Field>
                    <Header size='small'>Task Title</Header>
                    <FormInput
                      size='small'
                      placeholder='Add a task title'
                      value={formData.title}
                      type='text'
                      name='title'
                      onChange={handleChange}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column width={6} >
                  <Form.Field>
                    <Header size='small'>Related Job</Header>
                    <Dropdown
                      search
                      placeholder='Select your job...'
                      value={formData.job || ''}
                      name='job'
                      className='fluid'
                      selection
                      options={jobOptions}
                      onChange={selectDropdown}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column width={5} >
                  <Form.Field>
                    <Header size='small'>Task Category</Header>
                    <Dropdown
                      error={formErrors.task_category}
                      clearable
                      search
                      selection
                      placeholder='Category'
                      name='task_category'
                      options={taskCategories}
                      onChange={selectDropdown}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row only='tablet computer' className='row2'>
                <Grid.Column width={7}>
                  <Form.Field>
                    <Header size='small'>Notes</Header>
                    <FormInput
                      label
                      // error={formErrors.first_name}
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
                <Grid.Column width={5}>
                  <Form.Field>
                    <Header size='small'>Set Due Date</Header>
                    <SemanticDatepicker 
                      onChange={handleDateChange}
                      datePickerOnly
                      clearable
                      pointing='left'
                      name='reminder_date'
                      format='DD-MM-YYYY'
                      value={formData.reminder_date ? new Date(formData.reminder_date) : null}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={3} className='edit-btn'>
                  <Form.Field>
                    <FormButton
                      fluidSize='large'
                      color='red'
                      buttonText='Add'
                      type='submit'
                    ></FormButton>
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form> 
        </Segment>
      </Segment.Group>
    </div>
  )
}
export default TaskAddComputer