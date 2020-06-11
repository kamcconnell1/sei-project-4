/* eslint-disable camelcase */
import React from 'react'
import { Grid, Checkbox } from 'semantic-ui-react'

import TaskLabel from '../common/TaskLabel'

function TaskShowComputer({ id, completed, toggleCheckbox, task_category, job, date, title, toggleForm }) {
  
  return (

    <Grid textAlign='left' verticalAlign='middle' >
      <Grid.Row  only='tablet computer'>
        <button className='btn-not-displayed' onClick={toggleForm} value={id}>
          <Grid.Column className='task-label'>
            <TaskLabel category={task_category.id} />
          </Grid.Column>
          <Grid.Column className='task-checkbox'>
            <Checkbox
              id={id}
              checked={completed}
              onChange={toggleCheckbox}
            />
          </Grid.Column>
          <Grid.Column className='task-title'>
            {title ? title : task_category.name}
          </Grid.Column>
          <Grid.Column className='task-job'>
            {job ? `${job.company}: ${job.job_title}` : ''}
          </Grid.Column>
          <Grid.Column className='task-date'>
            {date}
          </Grid.Column>
        </button>
      </Grid.Row>
    </Grid>
  )
}
export default TaskShowComputer