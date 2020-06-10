import React from 'react'
import { Item } from 'semantic-ui-react'


function JobRelatedTasks ({ job }) {

  console.log(job.related_tasks)

  return (
    <Item.Group divided>
      {job.related_tasks.map(task => (
        <Item key={task.id}>
          <Item.Content>
            <Item.Header>{task.title ? task.title : 'No title'}</Item.Header>
            <Item.Meta>{task.task_category}</Item.Meta>
            <Item.Description>
              <p>{task.notes}</p>
            </Item.Description>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  )
}

export default JobRelatedTasks