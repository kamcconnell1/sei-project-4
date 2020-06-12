/* eslint-disable camelcase */
import React from 'react'
import { Icon } from 'semantic-ui-react'

function ContactCard({ id, email, job, job_title, name, phone, company, handleDeleteConfirmModal }) {

  return (
    <div className='contact-card'>
      <div className='contact-card-header'>
        <div>
          <p>{name}</p>
          {!job ? '' : <p>{company}</p>}

        </div>
        <button value={id} onClick={handleDeleteConfirmModal} className='delete-contact-btn'>
          <Icon name='trash' />
        </button>
      </div>
      <div className='contact-card-content'>
        <p>job title: {job_title}</p>
        <p>email: {email}</p>
        <p>phone: {phone}</p>
      </div>
    </div>
  )
}

export default ContactCard