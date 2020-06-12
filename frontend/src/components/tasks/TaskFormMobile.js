/* eslint-disable camelcase */
import React from 'react'
import { Form, Grid,  Header, Segment, Dropdown, Icon } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'

import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import TaskLabel from '../common/TaskLabel'
import { taskCategories } from './TaskCategories'


function TaskFormMobile({ closeForm, jobOptions, formData, task, date, selectDropdown, handleChange, handleDateChange, deleteItem, handleSubmit }) {
  
  const taskPlaceholder = (<span><TaskLabel category={task.task_category.id} /></span>)

  return (
    <Segment.Group className="TaskFormMobile" >
      <Segment>
        <Form size='large' onSubmit={handleSubmit}>
          <Grid stackable textAlign='left' verticalAlign='middle'  >
            <Grid.Row only='mobile'>
              <Grid.Column className='top-row'>
                <button className='btn-not-displayed'  onClick={closeForm}>
                  <Icon name='close'  />
                </button>
                <Header as='h1' id='header-font-tasks' textAlign='center'>Update Task</Header>
                <button className='btn-not-displayed'  onClick={deleteItem}>
                  <Icon name='trash'  />
                </button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only='mobile' className='row1'>
              <Grid.Column >
                <Header size='small'>Task Title</Header>
                <Form.Field >
                  <FormInput
                    fluidIcon='pencil alternate'
                    iconPosition='left'
                    placeholder='Title'
                    value={formData.title}
                    type='text'
                    name='title'
                    onChange={handleChange}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only='mobile' className='row2'>
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
            <Grid.Row only='mobile' className='row3'>
              <Grid.Column >
                <Header size='small'>Related Job</Header>
                <Form.Field >
                  <Dropdown
                    search
                    clearable
                    placeholder='Select applicable job...'
                    value={formData.job}
                    name='job'
                    className='fluid'
                    selection
                    options={jobOptions}
                    onChange={selectDropdown}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only='mobile' className='row4'>
              <Grid.Column >
                <Header size='small'>Notes</Header>
                <Form.Field>
                  <FormInput
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
            <Grid.Row only='mobile' className='row5'>
              <Grid.Column >
                <Header size='small' textAlign='left'>Update Date Due</Header>
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
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only='mobile' className='row6'>
              <Grid.Column >
                <Form.Field >
                  <p>{formData.reminder_date ? '' : 'Added:'}</p>
                  {date ? date : formData.added_date}
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only='mobile' className='row7'>
              <Grid.Column >
                <FormButton
                  color='red'
                  buttonText='Update'
                  type='submit'
                ></FormButton>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    </Segment.Group>
  )
}
export default TaskFormMobile