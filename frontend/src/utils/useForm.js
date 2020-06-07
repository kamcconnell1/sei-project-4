import React from 'react'

function useForm( initialFormState = {}, submitFunction, submitParams = null, onSubmitSuccess = () => {} ) {

  // * Initial state 
  const [formData, setFormData] = React.useState(initialFormState)
  const [formErrors, setFormErrors] = React.useState({})


  //* HandleChange event for inputting values on form & sets them and the errors to state 
  const handleChange = ({ target: { name, value } }) => {
    const updatedFormData = { ...formData, [name]: value }
    const updatedErrors = { ...formErrors, [name]: '' }
  
    setFormData(updatedFormData)
    setFormErrors(updatedErrors)
  }

  // * Handle submit function, on submitSuccess passed in as params 
  const handleSubmit = async event => {
    event.preventDefault()    
    
    try {
      const response = await submitFunction(formData, submitParams)
      onSubmitSuccess(response)
    } catch (err) {
      console.log(err)
      setFormErrors(err)
    }
  }

  return { formData, handleChange, setFormData, formErrors, setFormErrors, handleSubmit }
}
export default useForm