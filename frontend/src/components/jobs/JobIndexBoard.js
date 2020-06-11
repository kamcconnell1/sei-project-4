import React from 'react'
import { Button } from 'semantic-ui-react'

import JobIndexCard from './JobIndexCard'

function JobIndexBoard({ jobData, status, handleDeleteConfirmModal, handleBoardChangeMobile, handleNewJobModal, drop }) {

  const allowDrop = e => {
    e.preventDefault()
  }

  const drag = dragEvent => {
    dragEvent.dataTransfer.setData('jobId', dragEvent.target.id)
  }


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
      <div className='job-board-btn'>
        <Button
          animated='fade'
          className='fluid job-index-add-btn'
          onClick={handleNewJobModal}
          value={status.name}
        >
          <Button.Content visible>+</Button.Content>
          <Button.Content hidden>Add a new Job</Button.Content>
        </Button>
      </div>

      <div className="job-board-content" onDrop={drop} onDragOver={allowDrop} id={status.id}>
        {jobData.map(job => {
          if (job.status.name.toUpperCase() === status.name.toUpperCase()) {
            return (
              <JobIndexCard
                key={`jobindex${job.id}`}
                handleDeleteConfirmModal={handleDeleteConfirmModal}
                {...job}
                drag={drag}
              />
            )
          } else {
            return null
          }
        })}
      </div>

    </section>
  )
}



export default JobIndexBoard