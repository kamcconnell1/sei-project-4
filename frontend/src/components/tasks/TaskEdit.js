/* eslint-disable camelcase */
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Grid, Icon, Checkbox, Form, Button, Segment, Header, Dropdown } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'

import useForm from '../../utils/useForm'
import useDelete from '../../utils/useDelete'
import { getSingleTask, editTask, deleteTask } from '../../lib/api'

import GetDate from '../common/GetDate'
import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import TaskLabel from '../common/TaskLabel'
import PageContainer from '../common/PageContainer'

import { taskCategories } from './TaskCategories'
// import TaskEditMobile from './TaskEditMobile'


function TaskEdit() {
  const history = useHistory()
  const { id: taskId } = useParams()
  // const { data: task } = useFetch(getSingleTask, taskId)
  const { deleteItem } = useDelete(deleteTask, taskId, 'tasks')
  const [task, setTask] = React.useState(null)
  // const [  , setFormData] = useState('')

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

  //* Funtion to get the information on page load 
  // React.useEffect(() => {
  //   if (!task.job) {
  //     setFormData({
  //       ...task,
  //       task_category: task.task_category.id
  //     })
  //   } else {
  //     setFormData({
  //       ...task,
  //       job: task.job.id,
  //       task_category: task.task_category.id
  //     })
  //   }
  // }, [task, setFormData])

  //* Toggle form checkbox (doesn't update state until submit button pressed)
  const toggleCheckbox = async () => {
    setFormData({ ...formData, completed: !formData.completed })
  }

  // * FOR JSX
  if (!formData) return null
  const { added_date, notes, reminder_date, completed, title, id } = formData
  if (!task) return null
  const { job } = task
  // const task_category = task.task_category.id
  
  const dateProvided = () => {
    if (reminder_date) {
      return GetDate(reminder_date)
    } else {
      return GetDate(added_date)
    }
  }
  const date = dateProvided(reminder_date, added_date)
  const taskPlaceholder = ( <span><TaskLabel category={task.task_category.id} /></span> )
  

  return (
    <div className='TaskEdit'>
      <Form size='large' onSubmit={handleSubmit}>

        {/* TASK - HEADER */}
        <Header as='h1' textAlign='center'>Update Task</Header>
        <Grid stackable textAlign='left' verticalAlign='middle'  >

          {/* -----------MOBILE ONLY VIEW --------------------------*/}

          {/* !! need to come back to figure out why this didnt work  */}
          {/* <TaskEditMobile 
              {...task}
              {...formData}
              selectDropdown={selectDropdown}
              handleChange={handleChange}
              handleDateChange={handleDateChange}
              deleteItem={deleteItem}
            /> */}
          <Grid.Row only='mobile'>
            <Grid.Column >
              <Segment className='row1'>
                <div className='task-title'>
                  <Header as='small' textAlign='center'><Icon name='tag' color='grey' size='mini' />Task</Header>
                </div>
                <div className='task-category'>
                  <Dropdown
                    search
                    clearable
                    selection
                    placeholder={taskPlaceholder}
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
                <p className={completed === true ? 'completed-tasks' : ''}>
                  {job ? `${job.company}: ${job.job_title}` : ''}</p>
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
                  value={notes}
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
                <div className='date'>
                  {date ? date : added_date}
                </div>
                <div className='date-picker'>
                  <SemanticDatepicker onChange={handleDateChange}
                    datePickerOnly
                    clearable
                    pointing='right'
                    name='reminder_date'
                    format='DD-MM-YYYY'
                    value={reminder_date ? new Date(reminder_date) : null}
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
                    buttonText='Update'
                    type='submit'
                  ></FormButton>
                </div>
                <div className='delete-btn'>
                  <Button type='button' icon inverted color='red' onClick={deleteItem}>
                    <Icon name='trash alternate' size='large' />
                  </Button>
                </div>
              </Segment>
            </Grid.Column>
          </Grid.Row> 
        </Grid>


        {/*------------ TABLET COMPUTER VIEW ------------------------- */}

        <PageContainer>
          <Grid textAlign='left' verticalAlign='middle'  style={{ maxWidth: 900 }} className='edit-task-computer-tablet'>

            {/* TASK HEADER  */}
            <Grid.Row only='tablet computer' className='row1'>
              <Grid.Column width={3}>
                <TaskLabel category={task.task_category.id} />
              </Grid.Column>
              <Grid.Column width={1}>
                <Checkbox
                  id={id}
                  checked={completed}
                  onChange={toggleCheckbox}
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <FormInput
                  size='small'
                  placeholder={title ? title : task.task_category.name}
                  value={title }
                  type='text'
                  name='title'
                  onChange={handleChange}
                />
              </Grid.Column>
              <Grid.Column width={5} textAlign='right'>
                {job ? `${job.company}: ${job.job_title}` : ''}

                
              </Grid.Column>
              <Grid.Column width={2} textAlign='right'>
                {date}
              </Grid.Column>
            </Grid.Row>

            {/* TASKCONTENT */}
            <Grid.Row only='tablet computer' className='row2'>
              <Grid.Column width={14}>
                <FormInput
                  label
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
              <Grid.Column width={2} className='edit-btn'>
                <FormButton
                  // fluidSize='large'
                  color='pink'
                  buttonText='Update'
                  type='submit'
                ></FormButton>
              </Grid.Column>
            </Grid.Row>

            {/* TASK-FOOTER */}

            <Grid.Row only='tablet computer' className='row3'>
              <Grid.Column width={4}>
                <SemanticDatepicker onChange={handleDateChange}
                  datePickerOnly
                  clearable
                  pointing='left'
                  name='reminder_date'
                  format='DD-MM-YYYY'
                  value={ reminder_date ? new Date(reminder_date) : null }
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <Form.Dropdown
                  search
                  selection
                  placeholder='Update Task Type'
                  name='task_category'
                  options={taskCategories}
                  onChange={selectDropdown}
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <Form.Dropdown
                  search
                  selection
                  placeholder={job ? `${job.company}: ${job.job_title}` : ''}
                  // name='task_category'
                  // options={taskCategories}
                  // onChange={selectDropdown}
                />
              </Grid.Column>
              <Grid.Column width={2}>
                <Button type='button' icon inverted color='red' onClick={deleteItem}>
                  <Icon name='trash alternate' size='large' />
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </PageContainer>
      </Form>
    </div>
  )
}

export default TaskEdit