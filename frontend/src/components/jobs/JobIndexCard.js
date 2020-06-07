import React from 'react'
import { Link } from 'react-router-dom'

const JobIndexCard = ({ job_title: jobTitle, company, city, country, id }) => {
  return (
    <Link to={`/jobs/${id}`}>
      <div className="JobIndexCard">
        <h3>{jobTitle}</h3>
        <h3>{company}</h3>
        <h3>{city} - {country}</h3>
      </div>
    </Link>
  )
}

export default JobIndexCard