import React from 'react'
import { Form } from 'semantic-ui-react'

function FormWrapper({ onSubmit, children }) {
  return (
    <Form
      size='large' 
      onSubmit={onSubmit}
    >
      {children}
    </Form>
  )
}
export default FormWrapper