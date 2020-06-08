/* eslint-disable camelcase */
import React from 'react'
import { Grid, Icon, Label, Checkbox, Form } from 'semantic-ui-react'

import { taskCategories } from './TaskCategories'


class TaskShow extends React.Component {


  getDate = () => {
    const today_date = new Date().getTime()
    const reminder_date = (new Date(this.props.reminder_date).getTime())
    const microSecondsDiff = Math.abs(reminder_date - today_date)

    if (reminder_date > today_date) return `Due in: ${Math.floor(microSecondsDiff / (1000 * 60 * 60 * 24))} days`
    if (reminder_date < today_date) return `Overdue by: ${Math.floor(microSecondsDiff / (1000 * 60 * 60 * 24))} days`
  }


  render() {

    console.log(taskCategories)

    this.getDate()
    const { added_date, notes, reminder_date } = this.props
    const task_category = this.props.task_category.name
    const { company, job_title } = this.props.job
    console.log(reminder_date)


    const daysDiff = this.getDate()

    return (
      <div className="TaskShow">
        {/* TASK - HEADER */}
        <Grid celled textAlign='left' verticalAlign='middle' >
          <Grid.Row >
            <Grid.Column width={2}>
              <Label color='pink'>{task_category}</Label>
            </Grid.Column>
            <Grid.Column width={1}>
              <Checkbox />
            </Grid.Column>
            <Grid.Column width={10} textAlign='right'>
              {company}: {job_title}
            </Grid.Column>
            <Grid.Column width={3} textAlign='right'>
              {daysDiff}
            </Grid.Column>
          </Grid.Row>

          {/* TASK-CONTENT */}
          <Grid.Row >
            <Grid.Column width={16}>
              {notes}
            </Grid.Column>
          </Grid.Row>

          {/* TASK-FOOTER */}
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon name='calendar alternate' size='large' />
            </Grid.Column>
            <Grid.Column width={7}>
                Added: {added_date}
            </Grid.Column>
            <Grid.Column width={7}>
              <Form.Select
                options={taskCategories} />
            </Grid.Column>
            <Grid.Column width={1}>
              <Icon name='trash alternate' size='large' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default TaskShow