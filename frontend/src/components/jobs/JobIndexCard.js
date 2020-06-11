import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

function JobIndexCard({ handleDeleteConfirmModal, job_title: jobTitle, company, city, country, id, drag }) {

  return (
    <Link to={`/jobs/${id}`} >
      <div className="JobIndexCard" id={id} draggable='true' onDragStart={drag}>
        <div>
          <h3>{jobTitle}</h3>
          <h3>{company}</h3>
          <h3>{city} - {country}</h3>
        </div>
        <div>
          <button value={id} onClick={handleDeleteConfirmModal} className='delete-job-btn'>
            <Icon size='small' name='delete' />
          </button>
        </div>
      </div>
    </Link>
  )
}

export default JobIndexCard