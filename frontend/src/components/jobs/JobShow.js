import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleJob } from '../../lib/api'
import { Header, Segment, Tab } from 'semantic-ui-react'

import PageContainer from '../common/PageContainer'
import JobDetails from './JobDetails'
import JobRelatedTasks from './JobRelatedTasks'
import JobRelatedContacts from './JobRelatedContacts'

function JobShow() {
  const [job, setJob] = React.useState(null)
  const { id } = useParams()

  const panes = [
    {
      menuItem: 'Job details',
      displayName: 'JobDetails',
      render: function () {
        return <Tab.Pane attached={false}><JobDetails job={job} /></Tab.Pane>
      }
    },
    {
      menuItem: 'Tasks',
      displayName: 'JobRelatedTasks',
      render: function () {
        return <Tab.Pane attached={false}><JobRelatedTasks job={job} /></Tab.Pane>
      }
    },
    {
      menuItem: 'Contacts',
      displayName: 'JobRelatedContacts',
      render: function () {
        return <Tab.Pane attached={false}><JobRelatedContacts job={job} /></Tab.Pane>
      }
    }
  ]

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
          <Tab 
            menu={{ secondary: true, pointing: true }} 
            panes={panes}
          />
        </Segment>
      </Segment.Group>
    </PageContainer>
  )
}

export default JobShow