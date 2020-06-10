import React from 'react'
import { Button, Modal, Header, Form, Icon } from 'semantic-ui-react'
import FormInput from '../common/FormInput'

function ContactNewModal({
  modalOpen,
  formData,
  handleModalOpen,
  handleModalClose,
  handleChange,
  handleSubmit
}) {
  return (
    <div>
      <Modal open={modalOpen} onClose={handleModalClose} trigger={
        <div className='contact-add-btn'>
          <Button
            basic
            color='pink'
            animated='fade'
            className='fluid'
            onClick={handleModalOpen}
          >
            <Button.Content visible>+</Button.Content>
            <Button.Content hidden>Add a new Contact</Button.Content>
          </Button>
        </div>
      } closeIcon>
        <Header icon='at' content='add contact' />
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <FormInput
              className='fluid'
              focus
              placeholder='Name'
              value={formData.name || ''}
              type='text'
              name='name'
              onChange={handleChange}
            />
            <FormInput
              className='fluid'
              focus
              placeholder='Job title'
              value={formData.job_title || ''}
              type='text'
              name='job_title'
              onChange={handleChange}
            />
            <FormInput
              className='fluid'
              focus
              placeholder='Email'
              value={formData.email || ''}
              type='text'
              name='email'
              onChange={handleChange}
            />
            <FormInput
              className='fluid'
              focus
              placeholder='Phone'
              value={formData.phone || ''}
              type='text'
              name='phone'
              onChange={handleChange}
            />
            <FormInput
              className='fluid'
              focus
              placeholder='Job...'
              value={formData.job || ''}
              type='text'
              name='job'
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
  )
}

export default ContactNewModal