import React from 'react'

import JobIndexCard from './JobIndexCard'

class JobIndexBoard extends React.Component {
  render() {
    const { jobData, status, handleBoardChangeMobile } = this.props

    return (
      <section className={`job-board ${status}`}>
        <div className="job-board-header">
          <h1>
            <button
              onClick={handleBoardChangeMobile}
              value='left'
              name={status}
              className="arrow-left"
            >←</button>
            {status}
            <button
              onClick={handleBoardChangeMobile}
              value='right'
              name={status}
              className="arrow-right"
            >→</button>
          </h1>
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