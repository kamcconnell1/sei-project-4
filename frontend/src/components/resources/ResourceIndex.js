import React from 'react'
import { Link } from 'react-router-dom'
import { Header, Button, Modal, Icon, Form } from 'semantic-ui-react'

import { getAllResources } from '../../lib/api'
import useForm from '../../utils/useForm'
import FormInput from '../common/FormInput'
import useFetch from '../../utils/useFetch'
import ResourceCard from './ResourceCard'



function ResourceIndex() {
  const { data: resources } = useFetch(getAllResources)

  console.log(resources)

  if (!resources) return null

  return (
    <>
      <Header id='header-font-resources' as='h1' >Resources</Header>

      <div>
        <Modal trigger={
          <div className='contact-add-btn'>
            <Button basic color='orange' animated='fade' className='fluid'>
              <Button.Content visible>+</Button.Content>
              <Button.Content hidden>Add a new Resource</Button.Content>
            </Button>
          </div>
        } closeIcon>
          <Header icon='at' content='add resource' />
          <Modal.Content>
            <Form>
              <FormInput className='fluid' focus placeholder='resource title...' />
              <br />
              <FormInput className='fluid' focus placeholder='link...' />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='orange'>
              <Icon name='add circle' /> Add
            </Button>
          </Modal.Actions>
        </Modal>
      </div>

      <section className='ResourceIndex'>
        {resources.map((resource => (
          <ResourceCard
            key={resource.id}
            {...resource}
          />
        )))}
      </section>
    </>
  )
}

export default ResourceIndex