/* eslint-disable camelcase */
import React from 'react'
import { Form, Grid, Icon, Header, Segment, Dropdown, Button } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'

import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import TaskLabel from '../common/TaskLabel'
import { taskCategories } from './TaskCategories'


function TaskFormMobile({ formData, task, date, selectDropdown, handleChange, handleDateChange, deleteItem, handleSubmit }) {
  
  const taskPlaceholder = (<span><TaskLabel category={task.task_category.id} /></span>)

  return (
    <Segment.Group className="TaskFormMobile">
      <Segment>
        <Form size='large' onSubmit={handleSubmit}>
          <Grid textAlign='left' verticalAlign='middle'  >
            <Grid.Row only='mobile'>
              <Grid.Column>
                <Header as='h1' id='header-font-tasks' textAlign='center'>{formData.title ? formData.title : 'Update Task'}</Header>
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
                    placeholder={taskPlaceholder}
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
                <Segment >
                  <p className={formData.completed === true ? 'completed-tasks' : ''}>
                    {task.job ? `${task.job.company}: ${task.job.job_title}` : ''}</p>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only='mobile' className='row3'>
              <Grid.Column >
                <Header size='small'>Notes</Header>
                <Form.Field>
                  <FormInput
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
            </Grid.Row>
            <Grid.Row only='mobile' className='row4'>
              <Grid.Column >
                <Header size='small' textAlign='left'>Update Reminder Date</Header>
                <Form.Field >
                  <SemanticDatepicker onChange={handleDateChange}
                    datePickerOnly
                    clearable
                    iconPosition='left'
                    pointing='top right'
                    name='reminder_date'
                    format='DD-MM-YYYY'
                    value={formData.reminder_date ? new Date(formData.reminder_date) : null}
                  />
                  {date ? date : formData.added_date}
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only='mobile' className='row5'>
              <Grid.Column width={12}>
                <FormButton
                  fluidSize='large'
                  buttonText='Update'
                  type='submit'
                ></FormButton>
              </Grid.Column>
              <Grid.Column width={4}>
                <Button type='button' icon inverted color='red' onClick={deleteItem}>
                  <Icon name='trash alternate' size='large' />
                </Button>
              </Grid.Column>
            </Grid.Row> 
          </Grid>
        </Form>
      </Segment>
    </Segment.Group>
  )
}
export default TaskFormMobile