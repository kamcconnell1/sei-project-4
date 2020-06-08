/* eslint-disable camelcase */
import React from 'react'
import { Grid, Icon, Label, Checkbox } from 'semantic-ui-react'


class TaskShow extends React.Component {

  getDate = () => {
    // const date_today = new Date
    
    // const added_date = this.props.added_date
    // const reminder_date = this.props.reminder_date
    // console.log(Math.round((reminder_date - date_today) / (1000 * 60 * 60 * 24)))
    // console.log(Math.floor((Date.parse(reminder_date) - Date.parse(added_date)) / (86400000)))
    // console.log('added', added_date, 'reminder', reminder_date)

  }


  render() {

    this.getDate()
    const { added_date, notes, reminder_date, job } = this.props
    const task_category = this.props.task_category.name
    const { company, job_title } = this.props.job

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
              {reminder_date ? reminder_date : added_date}
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
              <Icon name='calendar alternate' size='large'/>
            </Grid.Column>
            <Grid.Column width={7}>
              Added: {added_date}
            </Grid.Column>
            <Grid.Column width={7}>
              {!job ? 'Select Job' : ''}
              {task_category}
            </Grid.Column>
            <Grid.Column width={1}>
              <Icon name='trash alternate' size='large'/>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </div>
    )
  }
}

export default TaskShow