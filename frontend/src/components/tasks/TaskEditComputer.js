/* eslint-disable camelcase */
import React, { useState  } from 'react'
import { Grid, Icon, Header, Checkbox, Dropdown, Button, Form } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'

import { editTask, deleteTask } from '../../lib/api'

import PageContainer from '../common/PageContainer'
import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import TaskLabel from '../common/TaskLabel'
import { taskCategories } from './TaskCategories'
import TaskComputerForm from './TaskComputerForm'

function TaskEditComputer({ closeForm, data }) {
  const [task, setTask] = React.useState(null)
  const [formData, setFormData] = React.useState(null)
  
  console.log('outside use effect', data)

  React.useEffect(() => {
    if (!data) return 
    setTask(data)
    console.log('inside use effect', data)
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
    // return () => {
    //   console.log('This will be logged on unmount')
    // }
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

  const handleSubmit = async event => {
    event.preventDefault()    
    console.log(formData)
    try {
      await editTask(formData, task.id)
      console.log('updated') 
    } catch (err) {
      console.log(err)
      // setFormErrors(err.response.data)
    }
  }

  console.log(formData)
  console.log(task)
  
  

  if (!formData) return null
  if (!task) return null
  const { notes, reminder_date, completed, title, id } = formData
  const { job } = task


  return (

    <TaskComputerForm
      task={task}
      // date={date}
      closeForm={closeForm}
      formData={formData}
      selectDropdown={selectDropdown}
      handleChange={handleChange}
      handleDateChange={handleDateChange}
      // deleteItem={deleteItem}
      handleSubmit={handleSubmit}
    />
    // <div className='TaskEditComputer'>
    //   <PageContainer>
    //     <Form size='large' onSubmit={handleSubmit}>
    //       <Grid textAlign='left' verticalAlign='middle' style={{ maxWidth: 900 }} className='edit-task-computer-tablet'>
    //         <Grid.Row only='tablet computer'>
    //           <Grid.Column width={15}>
    //             <Header as='h1' textAlign='center'>{title ? title : 'Update Task'}</Header>
    //           </Grid.Column>
    //           <Grid.Column width={1}>
    //             <Button circular icon='close' size='small' onClick={closeForm} />
    //           </Grid.Column>
    //         </Grid.Row>
    //         <Grid.Row only='tablet computer' className='row1'>
    //           <Grid.Column width={3}>
    //             <TaskLabel category={task.task_category.id ? task.task_category.id : null} />
    //           </Grid.Column>
    //           <Grid.Column width={1}>
    //             <Checkbox
    //               id={id}
    //               checked={completed}
    //             // onChange={toggleCheckbox}
    //             />
    //           </Grid.Column>
    //           <Grid.Column width={5}>
    //             <FormInput
    //               size='small'
    //               placeholder={title ? title : task.task_category.name}
    //               value={title || ''}
    //               type='text'
    //               name='title'
    //               onChange={handleChange}
    //             />
    //           </Grid.Column>
    //           <Grid.Column width={5} textAlign='right'>
    //             {job ? `${job.company}: ${job.job_title}` : ''}
    //           </Grid.Column>
    //           <Grid.Column width={2} textAlign='right'>
    //             {/* {date} */}
    //           </Grid.Column>
    //         </Grid.Row>
    //         <Grid.Row only='tablet computer' className='row2'>
    //           <Grid.Column width={14}>
    //             <FormInput
    //               label
    //               // error={formErrors.first_name}
    //               fluidIcon='pencil alternate'
    //               iconPosition='left'
    //               placeholder='Notes'
    //               value={notes || ''}
    //               type='text'
    //               name='notes'
    //               onChange={handleChange}
    //             />
    //           </Grid.Column>
    //           <Grid.Column width={2} className='edit-btn'>
    //             <FormButton
    //               fluidSize='large'
    //               color='pink'
    //               buttonText='Update'
    //               type='submit'
    //             ></FormButton>
    //           </Grid.Column>
    //         </Grid.Row>
    //         <Grid.Row only='tablet computer' className='row3'>
    //           <Grid.Column width={4}>
    //             <SemanticDatepicker 
    //               onChange={handleDateChange}
    //               datePickerOnly
    //               clearable
    //               pointing='left'
    //               name='reminder_date'
    //               format='DD-MM-YYYY'
    //               value={reminder_date ? new Date(reminder_date) : null}
    //             />
    //           </Grid.Column>
    //           <Grid.Column width={5}>
    //             <Dropdown
    //               clearable
    //               search
    //               selection
    //               placeholder={task.task_category.name}
    //               name='task_category'
    //               options={taskCategories}
    //               onChange={selectDropdown}
    //             />
    //           </Grid.Column>
    //           {/* <Grid.Column width={5}>
    //             <Dropdown
    //               clearable
    //               search
    //               selection
    //               placeholder={job ? `${job.company}: ${job.job_title}` : ''}
    //               name='job'
    //               options={taskCategories}
    //               onChange={selectDropdown}
    //             />
    //           </Grid.Column> */}
    //           <Grid.Column width={2}>
    //             <Button type='button' icon inverted color='red' 
    //             // onClick={deleteItem}
    //             >
    //               <Icon name='trash alternate' size='large' />
    //             </Button>
    //           </Grid.Column>
    //         </Grid.Row>
    //       </Grid>
    //     </Form>
    //   </PageContainer>
    // </div>
  )
}
export default TaskEditComputer