import React from 'react'

import { getAllJobs } from '../../lib/api'
import JobIndexCard from './JobIndexCard'

class JobIndex extends React.Component {
  state = {
    jobs: null
  }

  async componentDidMount() {
    try {
      const res = await getAllJobs()
      this.setState({ jobs: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {

    if (!this.state.jobs) return null

    console.log(this.state.jobs)


    return (
      <div className="JobIndex">
        <div className="job-boards">
          <section className="job-board wishlist">
            <div className="job-board-header">
              <h1>Wishlist</h1>
            </div>
            <div className="job-board-content">
              {this.state.jobs.map(job => {
                if (job.status.id === 1) {
                  return (
                    <JobIndexCard key={`jobindex${job.id}`} {...job}/>
                  )
                }
              })}
            </div>
          </section>
          <section className="job-board applied">
            <div className="job-board-header">
              <h1>Applied</h1>
            </div>
            <div className="job-board-content">
              {this.state.jobs.map(job => {
                if (job.status.id === 2) {
                  return (
                    <h2 key={`jobindex${job.id}`}>{job.job_title}</h2>
                  )
                }
              })}
            </div>
          </section>
          <section className="job-board interview">
            <div className="job-board-header">
              <h1>Interview</h1>
            </div>
            <div className="job-board-content">
              {this.state.jobs.map(job => {
                if (job.status.id === 3) {
                  return (
                    <h2 key={`jobindex${job.id}`}>{job.job_title}</h2>
                  )
                }
              })}
            </div>
          </section>
          <section className="job-board offer">
            <div className="job-board-header">
              <h1>Offer</h1>
            </div>
            <div className="job-board-content">
              {this.state.jobs.map(job => {
                if (job.status.id === 4) {
                  return (
                    <h2 key={`jobindex${job.id}`}>{job.job_title}</h2>
                  )
                }
              })}
            </div>
          </section>
          <section className="job-board rejected">
            <div className="job-board-header">
              <h1>Rejected</h1>
            </div>
            <div className="job-board-content">
              {this.state.jobs.map(job => {
                if (job.status.id === 5) {
                  return (
                    <h2 key={`jobindex${job.id}`}>{job.job_title}</h2>
                  )
                }
              })}
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default JobIndex