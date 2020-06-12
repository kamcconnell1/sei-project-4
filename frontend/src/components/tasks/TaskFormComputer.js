/* eslint-disable camelcase */
import React from 'react'
import { Form, Grid, Icon, Header, Dropdown, Button, Segment } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'

import PageContainer from '../common/PageContainer'
import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import TaskLabel from '../common/TaskLabel'
import { taskCategories } from './TaskCategories'



function TaskFormComputer({ date, jobOptions, formData, task, selectDropdown, handleChange, handleDateChange, deleteItem, handleSubmit, closeForm }) {

  if (!formData) return null
  const { notes, reminder_date, title } = formData
  const taskPlaceholder = (<span><TaskLabel category={task.task_category.id} /></span>)

  return (

    <PageContainer>
      <Segment.Group>
        <Segment className='taskedit-computer'>
          <Form size='large' onSubmit={handleSubmit}>
            <Grid >
              <Grid.Row only='tablet computer'>
                <Grid.Column width={1}>
                  <button className='btn-not-displayed'
                    type ='button' onClick={closeForm} >
                    <Icon name='close'  />
                  </button>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Header as='h1' textAlign='center'>Update Task</Header>
                </Grid.Column>
                <Grid.Column width={3} textAlign='right'>
                  <Form.Field>
                    {/* <p className='due-today'>Date</p>
                     */}
                    {date}
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row only='tablet computer' className='row1'>
                <Grid.Column width={5}>
                  <Form.Field>
                    <Header size='small'>Task Category</Header>
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
                <Grid.Column width={11}>
                  <Form.Field>
                    <Header size='small'>Task Title</Header>
                    <FormInput
                      placeholder={title ? title : 'Add Task Title'}
                      value={title || ''}
                      type='text'
                      name='title'
                      onChange={handleChange}
                    />
                  </Form.Field>
                </Grid.Column>

              </Grid.Row>

              <Grid.Row only='tablet computer' className='row2'>
                <Grid.Column width={16}>
                  <Form.Field>
                    <Header size='small'>Notes</Header>
                    <FormInput
                      label
                      fluidIcon='pencil alternate'
                      iconPosition='left'
                      placeholder='Notes'
                      value={notes || ''}
                      type='text'
                      name='notes'
                      onChange={handleChange}
                    />
                  </Form.Field>
                </Grid.Column>

              </Grid.Row>
              <Grid.Row only='tablet computer' className='row3'>
                <Grid.Column width={6}>
                  <Form.Field>
                    <Header size='small'>Reminder Date</Header>
                    <SemanticDatepicker 
                      size='large'
                      onChange={handleDateChange}
                      iconPosition='right'
                      datePickerOnly
                      clearable
                      pointing='left'
                      name='reminder_date'
                      format='DD-MM-YYYY'
                      value={reminder_date ? new Date(reminder_date) : null}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column width={10} >
                  <Form.Field>
                    <Header size='small'>Related Job</Header>
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
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row only='tablet computer' reverse className='row4'>
                <Grid.Column textAlign='right' width={14} className='edit-btn'>
                  <FormButton
                    color='red'
                    buttonText='Update'
                    type='submit'
                  ></FormButton>
                </Grid.Column>
                <Grid.Column width={2}>
                  <Button type='button' icon inverted color='red' size='small' value={task.id}
                    onClick={deleteItem}>
                    <Icon name='trash alternate' size='large' />
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Segment>
      </Segment.Group>
    </PageContainer>

  )
}
export default TaskFormComputer