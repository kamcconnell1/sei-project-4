import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSingleJob } from '../../lib/api'
import { Header, Grid, GridColumn, GridRow, Segment, Button } from 'semantic-ui-react'

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
          <Grid stackable columns={3}>
            <GridRow stretched>
              <GridColumn width={12}>
                <Header size='small'>Job title</Header>
                <Segment>
                  <p>{job.job_title}</p>
                </Segment>
              </GridColumn>
              <GridColumn width={4}>
                <Header size='small'>Application deadline</Header>
                <Segment>
                  <p>{job.application_deadline ? job.application_deadline : 'No date'}</p>
                </Segment>
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn width={12}>
                <Header size='small'>Company</Header>
                <Segment>
                  <p>{job.company}</p>
                </Segment>
              </GridColumn>
              <GridColumn width={4}>
                <Header size='small'>Application submitted</Header>
                <Segment>
                  <p>{job.application_submitted ? job.application_submitted : 'No date'}</p>
                </Segment>
              </GridColumn>
            </GridRow>
            <GridRow stretched>
              <GridColumn width={4}>
                <Header size='small'>City</Header>
                <Segment>
                  <p>{job.city}</p>
                </Segment>
              </GridColumn>
              <GridColumn width={8}>
                <Header size='small'>Country</Header>
                <Segment>
                  <p>{job.country}</p>
                </Segment>
              </GridColumn>
              <GridColumn width={4}>
                <Header size='small'>Interview date</Header>
                <Segment>
                  <p>{job.interview_date ? job.interview_date : 'No date'}</p>
                </Segment>
              </GridColumn>
            </GridRow>
            <GridRow stretched>
              <GridColumn width={12}>
                <Header size='small'>URL</Header>
                <Segment>
                  <p>{job.job_url}</p>
                </Segment>
              </GridColumn>
              <GridColumn width={4}>
                <Header size='small'>Job offer date</Header>
                <Segment>
                  <p>{job.job_offer_date ? job.application_submitted : 'No date'}</p>
                </Segment>
              </GridColumn>
            </GridRow>
            <GridRow stretched>
              <GridColumn width={6}>
                <Header size='small'>Salary</Header>
                <Segment>
                  <p>{job.salary}</p>
                </Segment>
              </GridColumn>
              <GridColumn width={6}>
                <Header size='small'>Status</Header>
                <Segment>
                  <p>{job.status.name}</p>
                </Segment>
              </GridColumn>
              <GridColumn width={4}>
                <Header size='small'>Offer accepted</Header>
                <Segment>
                  <p>{job.offer_accepted ? job.application_submitted : 'No date'}</p>
                </Segment>
              </GridColumn>
            </GridRow>
            <GridColumn>
            </GridColumn>
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