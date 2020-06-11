/* eslint-disable camelcase */
import React from 'react'
import { Form, Grid, Icon, Header, Segment, Dropdown, Button } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'

import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import TaskLabel from '../common/TaskLabel'
import { taskCategories } from './TaskCategories'


function TaskMobileForm({ formData, task, date, selectDropdown, handleChange, handleDateChange, deleteItem, handleSubmit }) {
  
  const taskPlaceholder = (<span><TaskLabel category={task.task_category.id} /></span>)

  return (
    <div className='TaskEditMobile'>
      <Form size='large' onSubmit={handleSubmit}>
        <Grid stackable textAlign='left' verticalAlign='middle'  >
          <Grid.Row only='mobile'>
            <Grid.Column>
              <Header as='h1' textAlign='center'>{formData.title ? formData.title : 'Update Task'}</Header>
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
                <p className={formData.completed === true ? 'completed-tasks' : ''}>
                  {task.job ? `${task.job.company}: ${task.job.job_title}` : ''}</p>
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
              <Header size='small'>Update Reminder Date</Header>
              <Segment className='row4'>
                <div className='date'>
                  {date ? date : formData.added_date}
                </div>
                <div className='date-picker'>
                  <SemanticDatepicker onChange={handleDateChange}
                    datePickerOnly
                    clearable
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
      </Form>
    </div>
  )
}
export default TaskMobileForm