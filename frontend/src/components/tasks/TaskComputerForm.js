/* eslint-disable camelcase */
import React from 'react'
import { Form, Grid, Icon, Header, Dropdown, Button, Checkbox } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'

import PageContainer from '../common/PageContainer'
import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import TaskLabel from '../common/TaskLabel'
import { taskCategories } from './TaskCategories'




function TaskComputerForm({ formData, task, date, selectDropdown, handleChange, handleDateChange, deleteItem, handleSubmit, closeForm }) {

  if (!formData) return null
  if (!task) return null
  const { notes, reminder_date, completed, title, id } = formData
  const { job } = task

  
  return (
    <div className='TaskEditComputer'>
      <PageContainer>
        <Form size='large' onSubmit={handleSubmit}>
          <Grid textAlign='left' verticalAlign='middle' style={{ maxWidth: 900 }} className='edit-task-computer-tablet'>
            <Grid.Row only='tablet computer'>
              <Grid.Column width={15}>
                <Header as='h1' textAlign='center'>{title ? title : 'Update Task'}</Header>
              </Grid.Column>
              <Grid.Column width={1}>
                <Button circular icon='close' size='small' onClick={closeForm} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only='tablet computer' className='row1'>
              <Grid.Column width={3}>
                <TaskLabel category={task.task_category.id ? task.task_category.id : null} />
              </Grid.Column>
              <Grid.Column width={1}>
                <Checkbox
                  id={id}
                  checked={completed}
                // onChange={toggleCheckbox}
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <FormInput
                  size='small'
                  placeholder={title ? title : task.task_category.name}
                  value={title || ''}
                  type='text'
                  name='title'
                  onChange={handleChange}
                />
              </Grid.Column>
              <Grid.Column width={5} textAlign='right'>
                {job ? `${job.company}: ${job.job_title}` : ''}
              </Grid.Column>
              <Grid.Column width={2} textAlign='right'>
                {/* {date} */}
              </Grid.Column>
            </Grid.Row>
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
                  fluidSize='large'
                  color='pink'
                  buttonText='Update'
                  type='submit'
                ></FormButton>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only='tablet computer' className='row3'>
              <Grid.Column width={4}>
                <SemanticDatepicker 
                  onChange={handleDateChange}
                  datePickerOnly
                  clearable
                  pointing='left'
                  name='reminder_date'
                  format='DD-MM-YYYY'
                  value={reminder_date ? new Date(reminder_date) : null}
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <Dropdown
                  clearable
                  search
                  selection
                  placeholder={task.task_category.name}
                  name='task_category'
                  options={taskCategories}
                  onChange={selectDropdown}
                />
              </Grid.Column>
              {/* <Grid.Column width={5}>
                <Dropdown
                  clearable
                  search
                  selection
                  placeholder={job ? `${job.company}: ${job.job_title}` : ''}
                  name='job'
                  options={taskCategories}
                  onChange={selectDropdown}
                />
              </Grid.Column> */}
              <Grid.Column width={2}>
                <Button type='button' icon inverted color='red' 
                // onClick={deleteItem}
                >
                  <Icon name='trash alternate' size='large' />
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </PageContainer>
    </div>
  )
}
export default TaskComputerForm