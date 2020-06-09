import React from 'react'
import { Link } from 'react-router-dom'

function ResourceCard({ title, url }) {

  return (
    <div className='resource-card'>
      <div className='resource-card-header'>
        <p>{title}</p>
        
      </div>
      <div className='resource-card-content'>
        <a href={url} target='_blank' rel='noreferrer'>{url}</a>
      </div>
    </div>
  )
}

export default ResourceCard