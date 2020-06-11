import React from 'react'
import { Link } from 'react-router-dom'
import { Item, Button } from 'semantic-ui-react'

function JobRelatedContacts ({ job }) {

  return (
    <Item.Group divided>
      {job.related_contacts.map(contact => (
        <Item key={contact.id}>
          <Item.Content>
            <Item.Header as='h2'>{contact.name}</Item.Header>
            <Item.Meta>{contact.job_title ? contact.job_title : '-'} at {contact.company ? contact.company : '-'}</Item.Meta>
            <Item.Description>
              <p>Email: {contact.email ? contact.email : ''}</p>
              <p>Phone: {contact.phone ? contact.phone : ''}</p>
            </Item.Description>
          </Item.Content>
        </Item>
      ))}
      <Link to={'/contacts/'}>
        <Button content='Go to contacts page' className='teal-button' fluid />
      </Link>
    </Item.Group>
  )
}

export default JobRelatedContacts