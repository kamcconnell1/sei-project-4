import React from 'react'
import { useHistory } from 'react-router-dom'

import { addNewJob } from '../../lib/api'
import { statusOptions } from '../../lib/statusOptions'
import useForm from '../../utils/useForm'

import PageContainer from '../common/PageContainer'
import JobForm from './JobForm'

function JobNew ({ handleNewJobModalClose, newJobStatus }) {

  const history = useHistory()

  const onSubmitSuccess = () => {
    handleNewJobModalClose()
    history.push('/jobs/')
  }

  const { formData, handleChange, handleDateChange, selectDropdown, formErrors, handleSubmit } = useForm({
    job_title: '',
    company: '',
    application_deadline: null,
    application_submitted: null,
    interview_date: null,
    job_offer_date: null,
    offer_acceptance_date: null,
    job_url: '',
    salary: null,
    city: '',
    country: '',
    status: ''
  }, addNewJob, null, onSubmitSuccess)

  console.log(newJobStatus)
  // console.log(formData)

  return (
    <PageContainer>
      <JobForm 
        data={formData}
        errors={formErrors}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        selectDropdown={selectDropdown}
        handleSubmit={handleSubmit}
        formHeaderText='Add new job'
        options={statusOptions}
        newJobStatus={newJobStatus}
        buttonText='Add'
      />
    </PageContainer>
  )
  
}

export default JobNew