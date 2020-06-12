import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Header } from 'semantic-ui-react'

import { getAllResources, addNewResource, deleteResource } from '../../lib/api'
import useForm from '../../utils/useForm'
import ResourceCard from './ResourceCard'
import ResourceNewModal from './ResourceNewModal'
import DeleteConfirmModal from '../common/DeleteConfirmModal'


function ResourceIndex() {
  const [resources, setResources] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [resourceToDelete, setResourceToDelete] = useState(null)
  const [search, setSearch] = useState('')
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

  const handleDeleteConfirmModal = e => {
    e.preventDefault()
    setResourceToDelete(e.currentTarget.value)
    setDeleteModalOpen(true)
  }

  const handleCloseDeleteConfirm = () => {
    setDeleteModalOpen(false)
  }

  const handleDeleteResource = async e => {
    e.preventDefault()
    try {
      await deleteResource(resourceToDelete)
      setDeleteModalOpen(false)
    } catch (err) {
      console.log(err)
    }
    getData()
  }

  const handleSearch = e => {
    setSearch(e.target.value)
  }

  const filteredResources = () => {
    const regexp = new RegExp(search, 'i')
    return resources.filter(resource => {
      return regexp.test(resource.title) || regexp.test(resource.link)
    })
  }

  if (!resources) return null

  return (
    <>
      <Header id='header-font-resources' as='h1' >Resources</Header>
      <DeleteConfirmModal
        deleteModalOpen={deleteModalOpen}
        handleCloseDeleteConfirm={handleCloseDeleteConfirm}
        nameOfThingToDelete='Resource'
        handleDelete={handleDeleteResource}
      />
      <ResourceNewModal
        modalOpen={modalOpen}
        formData={formData}
        handleModalOpen={handleModalOpen}
        handleModalClose={handleModalClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className='search-box'>
        <div className='ui fluid icon input'>
          <input type='text' placeholder='Search resources...' name='search' value={search} onChange={handleSearch} />
          <i aria-hidden='true' className='search icon'></i>
        </div>
      </div>
      <section className='ResourceIndex'>
        {filteredResources().map((resource => (
          <ResourceCard
            key={resource.id}
            handleDeleteConfirmModal={handleDeleteConfirmModal}
            {...resource}
          />
        )))}
      </section>
    </>
  )
}

export default ResourceIndex