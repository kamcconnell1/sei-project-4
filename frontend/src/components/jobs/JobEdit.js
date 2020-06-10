import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { getSingleJob, editJob } from '../../lib/api'
import { statusOptions } from '../../lib/statusOptions'
import useFetch from '../../utils/useFetch'
import useForm from '../../utils/useForm'

import PageContainer from '../common/PageContainer'
import JobForm from './JobForm'

function JobEdit() {
  const { id: jobId } = useParams()
  const history = useHistory()

  const { data: job, loading, error } = useFetch(getSingleJob, jobId)

  const onSubmitSuccess = () => {
    history.push(`/jobs/${jobId}/`)
  }

  const { formData, handleChange, handleDateChange,selectDropdown, setFormData, formErrors, handleSubmit } = useForm({
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
  }, editJob, jobId, onSubmitSuccess)

  React.useEffect(() => {
    if (job) {
      setFormData({ ...job, status: job.status.id })
    }
  }, [job, setFormData])

  if (error) {
    console.log(error)
  }

  return (
    <PageContainer>
      {loading ?
        'LOADING' :
        <JobForm
          data={formData}
          errors={formErrors}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          selectDropdown={selectDropdown}
          handleSubmit={handleSubmit}
          formHeaderText={`Update: ${job.job_title}`}
          options={statusOptions}
          buttonText='Update'
        />
      }
    </PageContainer >
  )
}
export default JobEdit
