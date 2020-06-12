import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Header } from 'semantic-ui-react'

import { getAllContacts, addNewContact, deleteContact, getAllJobs } from '../../lib/api'
import useForm from '../../utils/useForm'
import ContactCard from './ContactCard'
import ContactNewModal from './ContactNewModal'
import DeleteConfirmModal from '../common/DeleteConfirmModal'


function ContactIndex() {
  const [contacts, setContacts] = useState(null)
  const [jobs, setJobs] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [contactToDelete, setContactToDelete] = useState(null)
  const [search, setSearch] = useState('')
  const history = useHistory()


  const getData = async () => {
    try {
      const res = await getAllContacts()
      const jobsRes = await getAllJobs()
      setContacts(res.data)
      setJobs(jobsRes.data)
    } catch (err) {
      history.push('/notfound')
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const onSubmitSuccess = () => {
    formData.name = ''
    formData.job_title = ''
    formData.company = ''
    formData.email = ''
    formData.phone = ''
    formData.job = ''
    setModalOpen(false)
    getData()
  }

  const { formData, handleChange, handleSubmit, selectDropdown } = useForm({
    name: '',
    job_title: '',
    company: '',
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

  const handleDeleteConfirmModal = e => {
    e.preventDefault()
    setContactToDelete(e.currentTarget.value)
    setDeleteModalOpen(true)
  }

  const handleCloseDeleteConfirm = () => {
    setDeleteModalOpen(false)
  }

  const handleDeleteContact = async e => {
    e.preventDefault()
    try {
      await deleteContact(contactToDelete)
      setDeleteModalOpen(false)
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
      <Header id='header-font-contacts' as='h1' >Contacts</Header>
      <DeleteConfirmModal
        deleteModalOpen={deleteModalOpen}
        handleCloseDeleteConfirm={handleCloseDeleteConfirm}
        nameOfThingToDelete='Contact'
        handleDelete={handleDeleteContact}
      />
      <ContactNewModal
        jobs={jobs}
        modalOpen={modalOpen}
        formData={formData}
        selectDropdown={selectDropdown}
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
            handleDeleteConfirmModal={handleDeleteConfirmModal}
            {...contact}
          />
        )))}
      </section>
    </>
  )
}

export default ContactIndex