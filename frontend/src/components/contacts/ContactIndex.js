import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Header } from 'semantic-ui-react'

import { getAllContacts, addNewContact, deleteContact } from '../../lib/api'
import useForm from '../../utils/useForm'
import ContactCard from './ContactCard'
import ContactNewModal from './ContactNewModal'


function ContactIndex() {
  const [contacts, setContacts] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const history = useHistory()


  const getData = async () => {
    try {
      const res = await getAllContacts()
      setContacts(res.data)
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
    name: '',
    job_title: '',
    email: '',
    phone: '',
    job: ''
  }, addNewContact, null, onSubmitSuccess)

  const handleModalOpen = () => {
    setModalOpen(true)
  }
  const handleModalClose = () => {
    setModalOpen(false)
  }

  const handleDeleteContact = async e => {
    e.preventDefault()
    try {
      await deleteContact(e.currentTarget.value)
    } catch (err) {
      console.log(err)
    }
    getData()
  }

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
      <Header id="header-font-contacts" as='h1' >Contacts</Header>
     
      <ContactNewModal
        modalOpen={modalOpen}
        formData={formData}
        handleModalOpen={handleModalOpen}
        handleModalClose={handleModalClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className='search-box'>
        <div className='ui fluid icon input'>
          <input type='text' placeholder='Search contacts...' name='search' value={search} onChange={handleSearch} />
          <i aria-hidden='true' className='search icon'></i>
        </div>
      </div>
      <section className='ContactIndex'>
        {filteredContacts().map((contact => (
          <ContactCard
            key={contact.id}
            handleDeleteContact={handleDeleteContact}
            {...contact}
          />
        )))}
      </section>
    </>
  )
}

export default ContactIndex