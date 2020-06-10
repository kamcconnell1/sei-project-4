import React from 'react'
import { Grid, Card, Checkbox } from 'semantic-ui-react'

import TaskLabel from '../common/TaskLabel'

function TaskShowMobile({ id, completed, toggleCheckbox, taskCategory, job, date }) {
  return (
    <Grid.Row only='mobile' >
      <Card  href={`/tasks/${id}`} fluid>
        <div className='card-header'>
          <Card.Content>
            <Card.Header color='orange'>
              <div className='task-header'>
                <div className='task-checkbox'>
                  <Checkbox
                    id={id}
                    checked={completed}
                    onClick={toggleCheckbox} />
                </div>
                <div className='task-category'>
                  <TaskLabel category={taskCategory} />
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
  )
}
export default TaskShowMobile