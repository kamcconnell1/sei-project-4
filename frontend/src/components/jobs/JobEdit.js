import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Grid, Header, Segment, Form, Dropdown } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import { getSingleJob, editJob } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import useForm from '../../utils/useForm'

import PageContainer from '../common/PageContainer'
import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'

function JobEdit() {
  const { id: jobId } = useParams()
  const history = useHistory()

  const { data: job, loading, error } = useFetch(getSingleJob, jobId)

  const onSubmitSuccess = () => {
    history.push(`/jobs/${jobId}/`)
  }

  const { formData, handleChange, handleDateChange, setFormData, formErrors, handleSubmit } = useForm({
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

  // console.log(job)

  const statusOptions = [
    {
      key: 'Wishlist',
      text: 'Wishlist',
      value: 'Wishlist'
    },
    {
      key: 'Applied',
      text: 'Applied',
      value: 'Applied'
    },
    {
      key: 'Interview',
      text: 'Interview',
      value: 'Interview'
    },
    {
      key: 'Offer',
      text: 'Offer',
      value: 'Offer'
    },
    {
      key: 'Rejected',
      text: 'Rejected',
      value: 'Rejected'
    }
  ]

  if (error) {
    console.log(error)
  }

  return (
    <PageContainer>
      {loading ?
        'LOADING' :
        <Segment.Group>
          <Segment textAlign='left' color='orange'>
            <Header as='h1' textAlign='center'>Edit {job.job_title}</Header>
            <Form onSubmit={handleSubmit}>
              <Grid stackable columns={2}>
                <Grid.Row>
                  <Grid.Column width={11}>
                    <Form.Field>
                      <Header size='small'>Job title</Header>
                      <FormInput
                        error={formErrors.job_title}
                        fluidIcon='id badge outline'
                        iconPosition='left'
                        type='text'
                        placeholder='Job title'
                        name='job_title'
                        value={formData.job_title}
                        onChange={handleChange}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={5} only='computer tablet'>
                    <Form.Field>
                      <Header size='small'>Application deadline</Header>
                      <SemanticDatepicker
                        datePickerOnly
                        clearable
                        format='DD MMMM YYYY'
                        name='application_deadline'
                        value={formData.application_deadline ? new Date(formData.application_deadline) : null}
                        onChange={handleDateChange}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={11}>
                    <Form.Field>
                      <Header size='small'>Company</Header>
                      <FormInput
                        error={formErrors.company}
                        fluidIcon='building'
                        iconPosition='left'
                        type='text'
                        placeholder='Company'
                        name='company'
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={5} only='computer tablet'>
                    <Form.Field>
                      <Header size='small'>Application submitted</Header>
                      <SemanticDatepicker
                        datePickerOnly
                        clearable
                        format='DD MMMM YYYY'
                        name='application_submitted'
                        value={formData.application_submitted !== null ? new Date(formData.application_submitted) : null}
                        onChange={handleDateChange}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched>
                  <Grid.Column width={4}>
                    <Form.Field>
                      <Header size='small'>City</Header>
                      <FormInput
                        error={formErrors.city}
                        type='text'
                        placeholder='City'
                        name='city'
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={7}>
                    <Form.Field>
                      <Header size='small'>Country</Header>
                      <FormInput
                        error={formErrors.country}
                        type='text'
                        placeholder='Country'
                        name='country'
                        value={formData.country}
                        onChange={handleChange}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={3} only='computer tablet'>
                    <Form.Field>
                      <Header size='small'>Interview date</Header>
                      <SemanticDatepicker
                        datePickerOnly
                        clearable
                        format='DD MMMM YYYY'
                        name='interview_date'
                        value={formData.interview_date ? new Date(formData.interview_date) : null}
                        onChange={handleDateChange}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched>
                  <Grid.Column width={11}>
                    <Form.Field>
                      <Header size='small'>URL</Header>
                      <FormInput
                        error={formErrors.job_url}
                        type='text'
                        placeholder='Job URL'
                        name='job_url'
                        value={formData.job_url}
                        onChange={handleChange}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={5} only='computer tablet'>
                    <Form.Field>
                      <Header size='small'>Job offer date</Header>
                      <SemanticDatepicker
                        datePickerOnly
                        clearable
                        format='DD MMMM YYYY'
                        name='job_offer_date'
                        value={formData.job_offer_date ? new Date(formData.job_offer_date) : ''}
                        onChange={handleDateChange}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched>
                  <Grid.Column width={6}>
                    <Form.Field>
                      <Header size='small'>Salary</Header>
                      <FormInput
                        error={formErrors.salary}
                        type='text'
                        placeholder='Salary'
                        name='salary'
                        value={formData.salary}
                        onChange={handleChange}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Form.Field>
                      <Header size='small'>Status</Header>
                      <Dropdown
                        fluid
                        selection
                        error={formErrors.status}
                        name='status'
                        value='hey'
                        options={statusOptions}
                        onChange={handleChange}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={5} only='computer tablet'>
                    <Form.Field>
                      <Header size='small'>Offer accepted</Header>
                      <SemanticDatepicker
                        datePickerOnly
                        clearable
                        format='DD MMMM YYYY'
                        name='offer_accepted'
                        value={formData.offer_accepted ? new Date(formData.offer_accepted) : null}
                        onChange={handleDateChange}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Column width={4} only='mobile'>
                  <Header size='small'>Application deadline</Header>
                  <Segment>
                    <p>{job.application_deadline ? job.application_deadline : 'No date'}</p>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={4} only='mobile'>
                  <Header size='small'>Application submitted</Header>
                  <Segment>
                    <p>{job.application_submitted ? job.application_submitted : 'No date'}</p>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={4} only='mobile'>
                  <Header size='small'>Interview date</Header>
                  <Segment>
                    <p>{job.interview_date ? job.interview_date : 'No date'}</p>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={4} only='mobile'>
                  <Header size='small'>Job offer date</Header>
                  <Segment>
                    <p>{job.job_offer_date ? job.job_offer_date : 'No date'}</p>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={4} only='mobile'>
                  <Header size='small'>Offer accepted</Header>
                  <Segment>
                    <p>{job.offer_accepted ? job.offer_accepted : 'No date'}</p>
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                </Grid.Column>
              </Grid>
              <FormButton
                fluidSize='large'
                color='orange'
                buttonText='Update'
                type='submit'
              />
            </Form>
          </Segment>
        </Segment.Group>
      }
    </PageContainer >
  )
}
export default JobEdit
