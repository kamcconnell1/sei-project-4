/* eslint-disable camelcase */
import React from 'react'
import { Form, Grid, Icon, Header, Dropdown, Button } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'

import PageContainer from '../common/PageContainer'
import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import TaskLabel from '../common/TaskLabel'
import { taskCategories } from './TaskCategories'


function TaskComputerForm({ jobOptions, formData, task, selectDropdown, handleChange, handleDateChange, deleteItem, handleSubmit, closeForm }) {

  if (!formData) return null
  const { notes, reminder_date, title } = formData
  

  const taskPlaceholder = (<span><TaskLabel category={task.task_category.id} /></span>)

  return (
    <div className='TaskEditComputer'>
      <PageContainer>
        <Form size='large' onSubmit={handleSubmit}>
          <Grid textAlign='left' verticalAlign='middle' style={{ maxWidth: 900 }} className='edit-task-computer-tablet'>
            <Grid.Row only='tablet computer'>
              {/* <Grid.Column width={15}>
                <Header as='h1' textAlign='center'>{title ? title : 'Update Task'}</Header>
              </Grid.Column> */}
              <Grid.Column width={1}>
                <Button circular icon='close' type='button' size='small' onClick={closeForm} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only='tablet computer' className='row1'>
              <Grid.Column width={5}>
                <Dropdown
                  search
                  clearable
                  selection
                  placeholder={taskPlaceholder}
                  name='task_category'
                  options={taskCategories}
                  onChange={selectDropdown}
                />
              </Grid.Column>
              <Grid.Column width={9}>
                <FormInput
                  placeholder={title ? title : 'Add Task Title'}
                  value={title || ''}
                  type='text'
                  name='title'
                  onChange={handleChange}
                />
              </Grid.Column>
              <Grid.Column width={2} textAlign='right'>
                <p className='due-today'>Date</p>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row only='tablet computer' className='row2'>
              <Grid.Column width={16}>
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

            </Grid.Row>
            <Grid.Row only='tablet computer' className='row3'>
              <Grid.Column width={5}>
                <SemanticDatepicker 
                  onChange={handleDateChange}
                  iconPosition='right'
                  datePickerOnly
                  clearable
                  pointing='left'
                  name='reminder_date'
                  format='DD-MM-YYYY'
                  value={reminder_date ? new Date(reminder_date) : null}
                />
              </Grid.Column>
              <Grid.Column width={7} >
                <Dropdown
                  search
                  placeholder='Add related job'
                  value={formData.job }
                  name='job'
                  className='fluid'
                  selection
                  options={jobOptions}
                  onChange={selectDropdown}
                />
              </Grid.Column>
              <Grid.Column width={3} className='edit-btn'>
                <FormButton
                  fluidSize='large'
                  color='pink'
                  buttonText='Update'
                  type='submit'
                ></FormButton>
              </Grid.Column>
              <Grid.Column width={1}>
                <Button type='button' icon inverted color='red' size='small'
                  onClick={deleteItem}
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