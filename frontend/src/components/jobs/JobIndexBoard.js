import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import JobIndexCard from './JobIndexCard'

class JobIndexBoard extends React.Component {

  allowDrop = e => {
    e.preventDefault()
  }
  
  drag = dragEvent => {
    dragEvent.dataTransfer.setData('jobId', dragEvent.target.id)
  }

  render() {
    const { jobData, status, handleBoardChangeMobile, drop } = this.props

    return (
      
      <section className={status.isHidden ? 'job-board is-hidden' : `job-board ${status.name}`}>

        <div className="job-board-header">
          <button
            onClick={handleBoardChangeMobile}
            value='left'
            name={status.name}
            className="arrow-left"
          >&lt;</button>
          <h1>{status.name}</h1>
          <button
            onClick={handleBoardChangeMobile}
            value='right'
            name={status.name}
            className="arrow-right"
          >&gt;</button>
        </div>

        <Link to='/jobs/new/' className='job-add-btn'>
          <Button
            basic
            color='grey'
            animated='fade'
            className='fluid'
            value={status}
          >
            <Button.Content visible>+</Button.Content>
            <Button.Content hidden>Add a new Job</Button.Content>
          </Button>
        </Link>

        <div className="job-board-content" onDrop={drop} onDragOver={this.allowDrop} id={status.id}>
          {jobData.map(job => {
            if (job.status.name.toUpperCase() === status.name.toUpperCase()) {
              return (
                <JobIndexCard key={`jobindex${job.id}`} {...job} drag={this.drag}/>
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