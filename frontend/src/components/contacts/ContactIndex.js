import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import useFetch from '../../utils/useFetch'
import { getAllContacts } from '../../lib/api'
import ContactCard from './ContactCard'


function ContactIndex() {
  const { data: contacts } = useFetch(getAllContacts)
  const [search, setSearch] = useState('')

  const handleSearch = e => {
    setSearch(e.target.value)
  }

  const filteredContacts = () => {
    const regexp = new RegExp(search, 'i')
    return contacts.filter(contact => {
      if (!contact.job) {
        return regexp.test(contact.name) || regexp.test(contact.job_title)
      } else {
        return regexp.test(contact.name) || regexp.test(contact.job_title) || regexp.test(contact.job.company)
      }
    })
  }

  if (!contacts) return null

  return (
    <>
      <div className='search-box'>
        <div className='ui fluid icon input'>
          <input type='text' placeholder='Search contacts...' name='search' value={search} onChange={handleSearch} />
          <i aria-hidden='true' className='search icon'></i>
        </div>
      </div>
      <div className='contact-add-btn'>
        <Link to='/contacts/new/' className='add-btn'>
          <Button basic color='pink' animated='fade' className='fluid'>
            <Button.Content visible>+</Button.Content>
            <Button.Content hidden>Add a new Contact</Button.Content>
          </Button>
        </Link>
      </div>
      <section className='ContactIndex'>
        {filteredContacts().map((contact => (
          <ContactCard
            key={contact.id}
            {...contact}
          />
        )))}
      </section>
    </>
  )
}

export default ContactIndex