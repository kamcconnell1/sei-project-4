import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getSingleJob, editJob } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import useForm from '../../utils/useForm'

import PageContainer from '../common/PageContainer'
import FormWrapper from '../common/FormWrapper'
import FormInput from '../common/FormInput'

function JobShow() {
  const { id: jobId } = useParams()
  const history = useHistory()

  const { data: job, loading, error } = useFetch(getSingleJob, jobId)

  console.log(job)

  const onSubmitSuccess = () => {
    history.push(`/jobs/${jobId}`)
  }

  const { formData, handleChange, setFormData, formErrors, handleSubmit } = useForm({
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
    status: null
  }, editJob, jobId, onSubmitSuccess)

  React.useEffect(() => {
    if (job) {
      setFormData(job)
    }
  }, [job, setFormData])

  if (error) {
    console.log(error)
  }

  return (
    <PageContainer>
      {loading ?
        'LOADING'
        :
        <FormWrapper
          textAlign='center'
          verticalAlign='middle'
          formWidth='300'
          color='orange'
          onSubmit={handleSubmit}
        >
          <h1>{job.job_title}</h1>
          <FormInput 
            error={formErrors.job_title}
            placeholder='Job title'
            value={formData.job_title || ''}
            type='text'
            name='job_title'
            onChange={handleChange}
          />
          <FormInput 
            error={formErrors.company}
            placeholder='Company'
            value={formData.company || ''}
            type='text'
            name='company' 
            onChange={handleChange}
          />
        </FormWrapper>
      }
    </PageContainer>
  )

}

export default JobShow