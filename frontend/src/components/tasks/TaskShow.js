/* eslint-disable camelcase */
import React from 'react'
import { Grid, Icon, Label, Checkbox, Form } from 'semantic-ui-react'

import GetDate from '../common/GetDate'

function TaskShow({ added_date, reminder_date, task_category, job, completed, toggleCheckbox, id }) {

  const taskCategory = task_category.name

  const date = GetDate(reminder_date ? reminder_date : added_date)
  
  const handleClick = (event) => {
    console.log('clicked', event.target.name)
  
  }

  return (
    <div className="TaskShow">
      <Grid celled textAlign='left' verticalAlign='middle' >
        <Grid.Row >
          <Grid.Column width={4}>
            <Label color='pink'>{taskCategory}</Label>
          </Grid.Column>
          <Grid.Column width={1}>
            <Checkbox
              value={id}
              name='beans'
              checked={completed}
              onChange={toggleCheckbox}
              onClick={handleClick}
            />
          </Grid.Column>
          <Grid.Column width={9} textAlign='right'>
            {job ? `${job.company}: ${job.job_title}` : '' }
          </Grid.Column>
          <Grid.Column width={2} textAlign='right'>
            {date}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}


export default TaskShow