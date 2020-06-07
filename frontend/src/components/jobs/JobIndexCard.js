import React from 'react'
import { Link } from 'react-router-dom'

const JobIndexCard = ({ job_title: jobTitle, company, city, country, id }) => {
  return (
    <Link to={`/jobs/${id}`}>
      <div>
        <h1>{jobTitle} - {company}</h1>
        <h2>{city} - {country}</h2>
        <hr />
      </div>
    </Link>
  )
}

export default JobIndexCard