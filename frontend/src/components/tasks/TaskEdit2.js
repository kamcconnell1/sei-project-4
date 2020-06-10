/* eslint-disable camelcase */
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Grid, Icon, Checkbox, Form, Button } from 'semantic-ui-react'
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



function TaskEdit2() {
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

  // const getData = async () => {
  //   try {
  //     const res = await getSingleTask(taskId)
  //     const task = res.data
  //     setTask(task)
  //     if (!task.job) {
  //       setFormData({
  //         ...task,
  //         task_category: task.task_category.id,
  //         completed: !task.completed
  //       })
  //     } else {
  //       setFormData({
  //         ...task,
  //         job: task.job.id,
  //         task_category: task.task_category.id,
  //         completed: !task.completed
  //       })
  //     }
  //   } catch (err) {
  //     console.log(err)
  //     history.push('/notfound')
  //   }
  // }

  // React.useEffect(() => {
  //   getData()
  // }, [])


  // //* Toggle form checkbox (doesn't update state until submit button pressed)
  // const toggleCheckbox = async () => {
  //   setFormData({ ...formData, completed: !formData.completed })
  // }

  // // * FOR JSX
  // if (!formData) return null
  // const { added_date, notes, reminder_date, completed, title, id } = formData
  // if (!task) return null
  // const { job } = task
  // // const task_category = task.task_category.id
  
  // const dateProvided = () => {
  //   if (reminder_date) {
  //     return GetDate(reminder_date)
  //   } else {
  //     return GetDate(added_date)
  //   }
  // }
  // const date = dateProvided(reminder_date, added_date)
  

  return (
    <div className='TaskEdit'>
      <Form size='large' onSubmit={handleSubmit}>

        {/*------------ TABLET COMPUTER VIEW ------------------------- */}

        <PageContainer>
          <Grid textAlign='left' verticalAlign='middle'  style={{ maxWidth: 900 }} className='edit-task-computer-tablet'>

            {/* TASK HEADER  */}
            <Grid.Row only='tablet computer' className='row1'>
              <Grid.Column width={3}>
                {/* <TaskLabel category={task.task_category.id ? task.task_category.id : null } /> */}
              </Grid.Column>
              <Grid.Column width={1}>
                {/* <Checkbox
                  id={id}
                  checked={completed}
                  onChange={toggleCheckbox}
                /> */}
              </Grid.Column>
              <Grid.Column width={5}>
                <FormInput
                  size='small'
                  // placeholder={title ? title : task.task_category.name}
                  // value={title }
                  type='text'
                  name='title'
                  // onChange={handleChange}
                />
              </Grid.Column>
              <Grid.Column width={5} textAlign='right'>
                {/* {job ? `${job.company}: ${job.job_title}` : ''} */}
                hello
                
              </Grid.Column>
              <Grid.Column width={2} textAlign='right'>
                {/* {date} */}
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
                  // value={notes || ''}
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
                  // value={ reminder_date ? new Date(reminder_date) : null }
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <Form.Dropdown
                  search
                  selection
                  placeholder='Update Task Type'
                  name='task_category'
                  // options={taskCategories}
                  // onChange={selectDropdown}
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <Form.Dropdown
                  search
                  selection
                  // placeholder={job ? `${job.company}: ${job.job_title}` : ''}
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

export default TaskEdit2