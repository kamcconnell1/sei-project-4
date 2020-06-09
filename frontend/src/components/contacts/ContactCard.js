/* eslint-disable camelcase */
import React from 'react'

function ContactCard({ email, job, job_title, name, phone }) {

  return (
    <div className='contact-card'>
      <div className='contact-card-header'>
        {!job ? <p>{name}</p> : <p>{name} - {job.company}</p>}
        <p>{job_title}</p>
      </div>
      <div className='contact-card-content'>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
    </div>
  )
}

export default ContactCard