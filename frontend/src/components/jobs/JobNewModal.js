import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

import JobNew from './JobNew'

function JobNewModal({ addNewModalOpen, handleNewJobModalClose, newJobStatus }) {

  console.log(newJobStatus, typeof(newJobStatus))
  return (
    <Modal open={addNewModalOpen}>
      <Modal.Content>
        <JobNew
          handleNewJobModalClose={handleNewJobModalClose}
          newJobStatus={newJobStatus}
        />
        <Button
          fluid
          className='cancel-button'
          icon='ban'
          content='Cancel'
          onClick={handleNewJobModalClose}
        />
      </Modal.Content>
    </Modal>
  )
}

export default JobNewModal