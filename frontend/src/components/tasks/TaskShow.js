/* eslint-disable camelcase */
import React from 'react'

import GetDate from '../common/GetDate'
import TaskShowMobile from '../tasks/TaskShowMobile'

function TaskShow({ task, toggleCheckbox, toggleForm }) {

  const { added_date, reminder_date, task_category, title, job, completed, id } = task
  const date = GetDate(reminder_date ? reminder_date : added_date)

  return (
    <div className="TaskShow">

      <TaskShowMobile
        id={id}
        completed={completed}
        toggleCheckbox={toggleCheckbox}
        task_category={task_category}
        toggleForm={toggleForm}
        title={title}
        job={job}
        date={date}
      />
    </div>
  )
}


export default TaskShow