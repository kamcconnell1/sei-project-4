import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Header, Button, Modal, Icon, Form } from 'semantic-ui-react'

import { getAllResources, addNewResource, deleteResource } from '../../lib/api'
import useForm from '../../utils/useForm'
import FormInput from '../common/FormInput'
import ResourceCard from './ResourceCard'



function ResourceIndex() {
  const [resources, setResources] = React.useState(null)
  const [modalOpen, setModalOpen] = React.useState(false)
  const history = useHistory()



  const getData = async () => {
    try {
      const res = await getAllResources()
      setResources(res.data)
    } catch (err) {
      history.push('/notfound')
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const onSubmitSuccess = () => {
    formData.title = ''
    formData.url = ''
    setModalOpen(false)
    getData()
  }

  const { formData, handleChange, handleSubmit } = useForm({
    url: '',
    title: ''
  }, addNewResource, null, onSubmitSuccess)

  const handleModalOpen = () => {
    setModalOpen(true)
  }
  const handleModalClose = () => {
    setModalOpen(false)
  }

  const handleDeleteResource = async e => {
    e.preventDefault()
    try {
      await deleteResource(e.currentTarget.value)
    } catch (err) {
      console.log(err)
    }
    getData()
  }

  if (!resources) return null

  return (
    <>
      <Header id='header-font-resources' as='h1' >Resources</Header>

      <div>
        <Modal open={modalOpen} onClose={handleModalClose} trigger={
          <div className='contact-add-btn'>
            <Button
              basic
              color='orange'
              animated='fade'
              className='fluid'
              onClick={handleModalOpen}
            >
              <Button.Content visible>+</Button.Content>
              <Button.Content hidden>Add a new Resource</Button.Content>
            </Button>
          </div>
        } closeIcon>
          <Header icon='at' content='add resource' />
          <Modal.Content>
            <Form onSubmit={handleSubmit}>
              <FormInput
                className='fluid'
                focus
                placeholder='resource title...'
                value={formData.title || ''}
                type='text'
                name='title'
                onChange={handleChange}
              />
              <FormInput
                className='fluid'
                focus
                placeholder='link...'
                value={formData.url || ''}
                type='text'
                name='url'
                onChange={handleChange}
              />
              <Button
                fluid
                basic
                color='orange'
                type='submit'
              >
                <Icon name='add circle' /> Add
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>

      <section className='ResourceIndex'>
        {resources.map((resource => (
          <ResourceCard
            key={resource.id}
            handleDeleteResource={handleDeleteResource}
            {...resource}
          />
        )))}
      </section>
    </>
  )
}

export default ResourceIndex