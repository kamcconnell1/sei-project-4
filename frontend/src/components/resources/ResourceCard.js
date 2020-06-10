import React from 'react'
import { Icon } from 'semantic-ui-react'

function ResourceCard({ id, title, url, handleDeleteResource }) {

  return (
    <div className='resource-card'>
      <div className='resource-card-header'>
        <p>{title}</p>
        <button value={id} onClick={handleDeleteResource} className='delete-resource-btn'>
          <Icon size='large' name='delete' />
        </button>
      </div>
      <div className='resource-card-content'>
        <a href={url} target='_blank' rel='noreferrer'>{url}</a>
      </div>
    </div>
  )
}

export default ResourceCard