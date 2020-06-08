import React from 'react'
import { Button } from 'semantic-ui-react'

function FormButton({ fluidSize, color, buttonText, type }) {
  return (
    <Button
      id="form-button"
      fluid size={fluidSize}
      basic color={color}
      content={buttonText}
      type={type}
    />
  )
}

export default FormButton