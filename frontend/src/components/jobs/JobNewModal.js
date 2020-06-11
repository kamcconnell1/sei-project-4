import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

import JobNew from './JobNew'

function JobNewModal({ addNewModalOpen, handleNewJobModalClose }) {
  return (
    <Modal open={addNewModalOpen}>
      <Modal.Header>Add a new Job</Modal.Header>
      <Modal.Content>
        <JobNew
          handleNewJobModalClose={handleNewJobModalClose}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='pink' onClick={handleNewJobModalClose}>
          <Icon name='ban' /> cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default JobNewModal