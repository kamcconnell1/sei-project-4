import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSingleJob } from '../../lib/api'
import { Header, Grid, Segment, Button } from 'semantic-ui-react'

import PageContainer from '../common/PageContainer'

function JobShow() {
  const [job, setJob] = React.useState(null)
  const { id } = useParams()

  React.useEffect(() => {
    const getJobData = async () => {
      try {
        const { data } = await getSingleJob(id)
        setJob(data)
      } catch (err) {
        console.log(err)
      }
    }
    getJobData()
  }, [id])

  if (!job) return null

  return (
    <PageContainer>
      <Segment.Group>
        <Segment textAlign='left'>
          <Header as='h1' textAlign='center'>{job.job_title}</Header>
          <Grid stackable columns={2}>
            <Grid.Row stretched>
              <Grid.Column width={12}>
                <Header size='small'>Job title</Header>
                <Segment>
                  <p>{job.job_title}</p>
                </Segment>
              </Grid.Column>
              <Grid.Column width={4} only='computer tablet'>
                <Header size='small'>Application deadline</Header>
                <Segment>
                  <p>{job.application_deadline ? job.application_deadline : 'No date'}</p>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={12}>
                <Header size='small'>Company</Header>
                <Segment>
                  <p>{job.company}</p>
                </Segment>
              </Grid.Column>
              <Grid.Column width={4} only='computer tablet'>
                <Header size='small'>Application submitted</Header>
                <Segment>
                  <p>{job.application_submitted ? job.application_submitted : 'No date'}</p>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row stretched>
              <Grid.Column width={4}>
                <Header size='small'>City</Header>
                <Segment>
                  <p>{job.city}</p>
                </Segment>
              </Grid.Column>
              <Grid.Column width={8}>
                <Header size='small'>Country</Header>
                <Segment>
                  <p>{job.country}</p>
                </Segment>
              </Grid.Column>
              <Grid.Column width={4} only='computer tablet'>
                <Header size='small'>Interview date</Header>
                <Segment>
                  <p>{job.interview_date ? job.interview_date : 'No date'}</p>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row stretched>
              <Grid.Column width={12}>
                <Header size='small'>URL</Header>
                <Segment>
                  <a href={job.job_url} target='_blank' rel='opener noreferrer'><p>{job.job_url}</p></a>
                </Segment>
              </Grid.Column>
              <Grid.Column width={4} only='computer tablet'>
                <Header size='small'>Job offer date</Header>
                <Segment>
                  <p>{job.job_offer_date ? job.job_offer_date : 'No date'}</p>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row stretched>
              <Grid.Column width={6}>
                <Header size='small'>Salary</Header>
                <Segment>
                  <p>{job.salary ? job.salary : 'No salary'}</p>
                </Segment>
              </Grid.Column>
              <Grid.Column width={6}>
                <Header size='small'>Status</Header>
                <Segment>
                  <p>{job.status.name}</p>
                </Segment>
              </Grid.Column>
              <Grid.Column width={4} only='computer tablet'>
                <Header size='small'>Offer accepted</Header>
                <Segment>
                  <p>{job.offer_accepted ? job.offer_accepted : 'No date'}</p>
                </Segment>
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
          <Link to={`/jobs/${job.id}/edit`}>
            <Button content='Update' className='button orange-button' fluid />
          </Link>
        </Segment>
      </Segment.Group>
    </PageContainer >
  )
}

export default JobShow