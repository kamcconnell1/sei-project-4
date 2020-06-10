import React from 'react'
import { Link } from 'react-router-dom'
import { Item, Button } from 'semantic-ui-react'


function JobRelatedTasks({ job }) {

  return (
    <Item.Group divided>
      {job.related_tasks.map(task => (
        <Item key={task.id}>
          <Item.Content>
            <Item.Header>{task.title ? task.title : 'No title'}</Item.Header>
            <Item.Meta>{task.task_category.name}</Item.Meta>
            <Item.Description>
              <p>{task.notes ? task.notes : 'No notes'}</p>
            </Item.Description>
          </Item.Content>
        </Item>
      ))}
      <Link to={'/tasks/'}>
        <Button content='Go to tasks page' className='button orange-button' fluid />
      </Link>
    </Item.Group>
  )
}

export default JobRelatedTasks