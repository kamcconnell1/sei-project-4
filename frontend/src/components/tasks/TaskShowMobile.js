/* eslint-disable camelcase */
import React from 'react'
import { Grid, Card, Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import TaskLabel from '../common/TaskLabel'

function TaskShowMobile({ id, completed, toggleCheckbox, task_category, job, date, title }) {
  
  return (
    
    <Grid textAlign='left' verticalAlign='middle' >
      <Grid.Row only='mobile' >
        <Card  href={`/tasks/${id}`} fluid>
          <div className='taskshow-mobile'>
            <Card.Content>
              <Card.Header color='orange'>
                <div className='task-header'>
                  <div className='task-checkbox'>
                    <Checkbox
                      id={id}
                      checked={completed}
                      onClick={toggleCheckbox} />
                  </div>
                  <div className='task-title'>
                    { title ? title : task_category.name }
                  </div>
                  <div className='task-category'>
                    <TaskLabel category={task_category.id} />
                  </div>
                </div>
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <div className='task-content'>
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
export default TaskShowMobile