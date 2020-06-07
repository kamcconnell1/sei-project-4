import React from 'react'
import { Link } from 'react-router-dom'

const JobIndexCard = ({ job_title: jobTitle, company, city, country, id }) => {
  return (
    <Link to={`/jobs/${id}`}>
      <div className="job-index-card">
        <h3>{jobTitle} - {company}</h3>
        <h3>{city} - {country}</h3>
        <hr />
      </div>
    </Link>
  )
}

export default JobIndexCard