/* eslint-disable camelcase */
import React from 'react'
import { Grid, Card, Checkbox, Icon } from 'semantic-ui-react'

import TaskLabel from '../common/TaskLabel'

function TaskShowCard(
  { id, completed, toggleCheckbox, toggleForm, task_category, job, date, title }) {


  return (
    <Grid textAlign='left' verticalAlign='middle' >
      <Grid.Row  >
        <Card fluid>
          <div className='taskshow-mobile' >
            <Card.Content>
              <Card.Header>
                <div className='task-header'>
                  <div className='task-checkbox'>
                    <Checkbox
                      id={id}
                      checked={completed}
                      onChange={toggleCheckbox} />
                  </div>
                  <div className='task-title'>
                    {title ? title : task_category.name}
                  </div>
                  <div className='task-category'>
                    <TaskLabel category={task_category.id} />
                  </div>
                </div>
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <div className='task-content'>
                <button className='btn-not-displayed' type='button' onClick={toggleForm} value={id}> <Icon name='edit outline' />
                </button>
                <div className='task-job'>
                  {job ? `${job.company}: ${job.job_title}` : ''}
                </div>
                <div className='task-date'>
                  {date}
                </div>
              </div>
            </Card.Content>
          </div>
        </Card>
      </Grid.Row>
    </Grid>
  )
}
export default TaskShowCard