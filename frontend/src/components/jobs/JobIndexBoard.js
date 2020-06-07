import React from 'react'

import JobIndexCard from './JobIndexCard'

class JobIndexBoard extends React.Component {
  render() {
    const { jobData, status } = this.props
    
    return (
      <section className={`job-board ${status}`}>
        <div className="job-board-header">
          <h1><small className="arrow-left">←</small>{status}<small className="arrow-right">→</small></h1>
        </div>
        <div className="job-board-content">
          {jobData.map(job => {
            if (job.status.name.toUpperCase() === status.toUpperCase()) {
              return (
                <JobIndexCard key={`jobindex${job.id}`} {...job} />
              )
            } else {
              return null
            }
          })}
        </div>
      </section>
    )
  }
}


export default JobIndexBoard