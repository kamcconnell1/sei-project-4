/* eslint-disable camelcase */
import React, { useState } from 'react'
import { Grid, Checkbox } from 'semantic-ui-react'

import TaskLabel from '../common/TaskLabel'
import GetDate from '../common/GetDate'

import TaskShowMobile from '../tasks/TaskShowMobile'

function TaskShow({ task,  toggleCheckbox }) {
  const [formVisible, showForm] = React.useState(false)

  
  const { added_date, reminder_date, task_category, title, job, completed, id } = task
  
  const onClickItem = (event)=> {
    

    console.log(event.currentTarget)
    console.log(event.currentTarget.value)
    
    
  }
  

  const date = GetDate(reminder_date ? reminder_date : added_date)
  return (
    <div className="TaskShow">
      <Grid textAlign='left' verticalAlign='middle' >

        {/* -----------MOBILE ONLY VIEW --------------------------*/}
        <TaskShowMobile 
          id={id}
          completed={completed}
          toggleCheckbox={toggleCheckbox}
          task_category={task_category}
          title={title}
          job={job}
          date={date}
        />
      </Grid>

      {/* ---------TABLET COMPUTER VIEW ----------------------------- */}
      <Grid textAlign='left' verticalAlign='middle' >
        <Grid.Row  only='tablet computer'>
          <button className='btn-not-displayed' onClick={onClickItem} value={task.id}>
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
    </div>
  )
}


export default TaskShow