import React from 'react'
import { Form } from 'semantic-ui-react'

function FormInput( {  error, fluidIcon, iconPosition, type, name, value, placeholder, onChange, size }) {
  
  return (
    <Form.Input 
      error={ error ? error : null }
      size={size}
      fluid icon={fluidIcon}
      iconPosition={iconPosition}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}

export default FormInput