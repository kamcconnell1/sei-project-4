/* eslint-disable camelcase */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Card, Checkbox } from 'semantic-ui-react'

import TaskLabel from '../common/TaskLabel'
import useWindowSize from '../../utils/useWindowSize'

function TaskShowCard(
  { id, completed, toggleCheckbox, toggleForm, task_category, job, date, title }) {
  const { width } = useWindowSize()
  const history = useHistory()

  const handleClick = (event) => { 
    const id = event.currentTarget.value
    if (width < 768){
      history.push(`/tasks/${id}`)
    } else {
      toggleForm(id)
    }
  }
  
  return (
    <Grid textAlign='left' verticalAlign='middle' >
      <Grid.Row  >
        <button className='btn-not-displayed' type='button' onClick={handleClick} value={id} >
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
        </button>
      </Grid.Row>
    </Grid>
  )
}
export default TaskShowCard