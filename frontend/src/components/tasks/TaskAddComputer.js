import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Grid,  Header, Dropdown, Button } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'


import useForm from '../../utils/useForm'
import { getAllJobs, addNewTask } from '../../lib/api'
import PageContainer from '../common/PageContainer'
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

  const { formData, handleChange, selectDropdown, handleDateChange, handleSubmit } = useForm({
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
      <PageContainer>
        <Form size='large' onSubmit={handleSubmit}>
          <Grid textAlign='left' verticalAlign='middle' style={{ maxWidth: 900 }} className='edit-task-computer-tablet'>
            <Grid.Row only='tablet computer'>
              <Grid.Column width={15}>
                <Header as='h1' textAlign='center'>Add Task</Header>
              </Grid.Column>
              <Grid.Column width={1}>
                <Button circular icon='close' size='small' 
                  type ='button' onClick={closeForm} 
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only='tablet computer' className='row1'>
              <Grid.Column width={5}>
                <FormInput
                  size='small'
                  placeholder='Add a task title'
                  value={formData.title}
                  type='text'
                  name='title'
                  onChange={handleChange}
                />
              </Grid.Column>
              <Grid.Column width={6} textAlign='right'>
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
              </Grid.Column>
              <Grid.Column width={5} textAlign='right'>
                <Dropdown
                  clearable
                  search
                  selection
                  placeholder='Select a task category'
                  name='task_category'
                  options={taskCategories}
                  onChange={selectDropdown}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only='tablet computer' className='row2'>
              <Grid.Column width={8}>
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
              </Grid.Column>
              <Grid.Column width={5}>
                <SemanticDatepicker 
                  onChange={handleDateChange}
                  datePickerOnly
                  clearable
                  pointing='left'
                  name='reminder_date'
                  format='DD-MM-YYYY'
                  value={formData.reminder_date ? new Date(formData.reminder_date) : null}
                />
              </Grid.Column>
              <Grid.Column width={3} className='edit-btn'>
                <FormButton
                  fluidSize='large'
                  color='pink'
                  buttonText='Add Task'
                  type='submit'
                ></FormButton>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </PageContainer>
    </div>
  )
}
export default TaskAddComputer