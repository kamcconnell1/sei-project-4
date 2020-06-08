import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
// import { DateInput } from 'semantic-ui-calendar-react'
import { getSingleJob, editJob } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import useForm from '../../utils/useForm'
import PageContainer from '../common/PageContainer'
import FormWrapper from '../common/FormWrapper'
import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
function JobEdit() {
  const { id: jobId } = useParams()
  const history = useHistory()
  const { data: job, loading, error } = useFetch(getSingleJob, jobId)
  const onSubmitSuccess = () => {
    history.push(`/jobs/${jobId}/`)
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
      setFormData({ ...job, status: job.status.id })
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
          formWidth='450'
          color='orange'
          onSubmit={handleSubmit}
        >
          <h1>{formData.job_title}</h1>
          <div className='field'>
            <label>Job title</label>
            <FormInput
              error={formErrors.job_title}
              placeholder='Job title'
              value={formData.job_title || ''}
              type='text'
              name='job_title'
              onChange={handleChange}
              className='fluid'
            />
          </div>
          <div className='field'>
            <label>Company</label>
            <FormInput
              error={formErrors.company}
              placeholder='Company'
              value={formData.company || ''}
              type='text'
              name='company'
              onChange={handleChange}
            />
          </div>
          {/* <div className='field'>
            <label>Application deadline</label>
            <DateInput
              error={formErrors.application_deadline}
              placeholder='Date'
              value={formData.application_deadline || ''}
              type='text'
              name='application_deadline'
              onChange={handleChange}
            />
          </div> */}
          {/* 
          <div className='field'>
            <label>Application submitted</label>
            <DateInput
              placeholder='Date'
              value={formData.application_submitted || ''}
              type='date'
              name='application_submitted'
              onChange={handleChange}
            />
          </div>
          <div className='field'>
            <label>Interview date</label>
            <FormInput
              error={formErrors.interview_date}
              placeholder='Date'
              value={formData.interview_date || ''}
              type='date'
              name='interview_date'
              onChange={handleChange}
            />
          </div>
          <div className='field'>
            <label>Offer accepted</label>
            <FormInput
              error={formErrors.offer_acceptance_date}
              placeholder='Date'
              value={formData.offer_acceptance_date || ''}
              type='date'
              name='offer_acceptance_date'
              onChange={handleChange}
            />
          </div>
          <div className='field'>
            <label>Job URL</label>
            <FormInput
              error={formErrors.job_url}
              placeholder='Enter link'
              value={formData.job_url || ''}
              type='text'
              name='job_url'
              onChange={handleChange}
            />
          </div>
          <div className='field'>
            <label>Salary</label>
            <FormInput
              error={formErrors.salary}
              placeholder='Salary'
              value={formData.salary || ''}
              type='text'
              name='salary'
              onChange={handleChange}
            />
          </div>
          <div className='field'>
            <label>City</label>
            <FormInput
              error={formErrors.city}
              placeholder='City'
              value={formData.city || ''}
              type='text'
              name='city'
              onChange={handleChange}
            />
          </div>
          <div className='field'>
            <label>Country</label>
            <FormInput
              error={formErrors.country}
              placeholder='Country'
              value={formData.country || ''}
              type='text'
              name='country'
              onChange={handleChange}
            />
          </div>
          <div className='field'>
            <label>Status</label>
            <select 
              className='selection dropdown'
              name='status'
              value={formData.status.name}
              onChange={handleChange}
            >
              <option value={formData.status.name}>{formData.status.name}</option>
              <option value='Applied'>Applied</option>
            </select>
          </div> */}
          <FormButton
            fluidSize='large'
            color='orange'
            buttonText='Update'
            type='submit'
          ></FormButton>
        </FormWrapper>
      }
    </PageContainer >
  )
}
export default JobEdit