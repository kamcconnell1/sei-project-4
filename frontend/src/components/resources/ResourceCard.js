import React from 'react'
import { Icon } from 'semantic-ui-react'

function ResourceCard({ id, title, url, handleDeleteConfirmModal }) {

  return (
    <div className='resource-card'>
      <div className='resource-card-header'>
        <p>{title}</p>
        <button value={id} onClick={handleDeleteConfirmModal} className='delete-resource-btn'>
          <Icon size='large' name='delete' />
        </button>
      </div>
      <div className='resource-card-content'>
        <a href={url} target='_blank' rel="noopener noreferrer" >{url}</a>
      </div>
    </div>
  )
}

export default ResourceCard