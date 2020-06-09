/* eslint-disable camelcase */
import React from 'react'
import { Grid, Checkbox } from 'semantic-ui-react'

import TaskLabel from '../common/TaskLabel'

import GetDate from '../common/GetDate'

function TaskShow({ added_date, reminder_date, task_category, job, completed, id , toggleCheckbox }) {

  const taskCategory = task_category.name
  const date = GetDate(reminder_date ? reminder_date : added_date)

  return (
    <div className="TaskShow">
      <Grid celled textAlign='left' verticalAlign='middle' >
        <Grid.Row >
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