import React from 'react'
import { Button } from 'semantic-ui-react'

function AddButton({ color, buttonText, onClick }) {
  return (
    <Button basic color={color} animated='fade' className='fluid' onClick={onClick}>
      <Button.Content visible>+</Button.Content>
      <Button.Content hidden>{buttonText}</Button.Content>
    </Button>
  )
}
export default AddButton