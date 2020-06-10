/* eslint-disable camelcase */
import React from 'react'
import { Grid, Checkbox, Segment } from 'semantic-ui-react'

import TaskLabel from '../common/TaskLabel'
import GetDate from '../common/GetDate'
import FormButton from '../common/FormButton'
import FormInput from '../common/FormInput'

import TaskShowMobile from '../tasks/TaskShowMobile'

function TaskShow({ added_date, reminder_date, task_category, job, completed, id, toggleCheckbox }) {

  

  
  const onClick = () => {
    console.log('clicked')
  }
  
  const taskCategory = task_category.id
  const date = GetDate(reminder_date ? reminder_date : added_date)
  return (
    <div className="TaskShow">
      <Grid textAlign='left' verticalAlign='middle' >

        {/* -----------MOBILE ONLY VIEW --------------------------*/}
        <TaskShowMobile 
          id={id}
          completed={completed}
          toggleCheckbox={toggleCheckbox}
          taskCategory={taskCategory}
          job={job}
          date={date}
        />

        {/* ---------TABLET COMPUTER VIEW ----------------------------- */}
        {/* <Segment.Group className='is-edit'> */}
        <Grid.Row onClick={onClick} only='tablet computer'>
          <Grid.Column width={4}>
            <TaskLabel category={taskCategory} />
          </Grid.Column>
          <Grid.Column width={1}>
            <Checkbox
              id={id}
              checked={completed}
              onChange={toggleCheckbox}
            />
          </Grid.Column>
          <Grid.Column width={9} textAlign='right'>
            {job ? `${job.company}: ${job.job_title}` : ''}
          </Grid.Column>
          <Grid.Column width={2} textAlign='right'>
            {date}
          </Grid.Column>
        </Grid.Row>
        <div className='task-edit-show'>
          <Grid.Row only='tablet computer'>
            <Grid.Column width={14}>
              <FormInput
                // error={formErrors.first_name}
                fluidIcon='pencil alternate'
                iconPosition='left'
                placeholder='Notes'
                // value={notes || ''}
                type='text'
                name='notes'
                // onChange={handleChange}
              />
            </Grid.Column>
            <Grid.Column width={2}>
              <FormButton
                // fluidSize='large'
                color='pink'
                buttonText='Update'
                type='submit'
              ></FormButton>
            </Grid.Column>
          </Grid.Row>

        </div>
        {/* </Segment.Group> */}
      </Grid>
    </div>
  )
}


export default TaskShow