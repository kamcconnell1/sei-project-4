import React from 'react'
import { Link } from 'react-router-dom'

import JobIndexCard from './JobIndexCard'

class JobIndexBoard extends React.Component {
  render() {
    const { jobData, status, handleBoardChangeMobile } = this.props

    return (
      <section className={status.isHidden ? 'job-board is-hidden' : `job-board ${status.name}`}>
        <div className="job-board-header">
          <button
            onClick={handleBoardChangeMobile}
            value='left'
            name={status.name}
            className="arrow-left"
          >←</button>
          <h1>{status.name}</h1>
          <button
            onClick={handleBoardChangeMobile}
            value='right'
            name={status.name}
            className="arrow-right"
          >→</button>
        </div>
        <div className='job-add-btn'>
          <Link to='/jobs/new/' className='add-btn'>+</Link>
        </div>
        <div className="job-board-content">
          {jobData.map(job => {
            if (job.status.name.toUpperCase() === status.name.toUpperCase()) {
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