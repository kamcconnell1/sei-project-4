import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Header } from 'semantic-ui-react'

import { getAllResources, addNewResource, deleteResource } from '../../lib/api'
import useForm from '../../utils/useForm'
import ResourceCard from './ResourceCard'
import ResourceNewModal from './ResourceNewModal'



function ResourceIndex() {
  const [resources, setResources] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
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
      <ResourceNewModal
        modalOpen={modalOpen}
        formData={formData}
        handleModalOpen={handleModalOpen}
        handleModalClose={handleModalClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

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