import React from 'react'

function useForm({ initialFormState = {}, submitFunction, submitParams = null, onSubmitSuccess = () => {} }) {

  const [formData, setFormData] = React.useState(initialFormState)
  const [formErrors, setFormErrors] = React.useState({})


  //* HandleChange event for inputting values on form 
  const handleChange = ({ target: { name, value } }) => {
    const updatedFormData = { ...formData, [name]: value }
    const updatedErrors = { ...formErrors, [name]: '' }
    setFormData(updatedFormData)
    setFormErrors(updatedErrors)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await submitFunction(formData, submitParams)
      onSubmitSuccess(response)
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }

  return { formData, handleChange, setFormData, formErrors, setFormErrors, handleSubmit }
}
export default useForm