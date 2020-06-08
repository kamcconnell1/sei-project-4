import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

import useForm from '../../utils/useForm'
import FormWrapper from '../common/FormWrapper'
import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import { registerUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

function Register() {
  const history = useHistory()

  const onSubmitSuccess = response => {
    setToken(response.data.token)
    history.push('/jobs')
  }

  //*State
  const [formErrors, setError] = useState({
    username: '',
    first_name: '', 
    last_name: '', 
    email: '',
    password: '',
    password_confirmation: ''
  })

  //* initalFormState & props for useForm hook
  const { formData,  handleChange } = useForm({
    username: '',
    first_name: '', 
    last_name: '', 
    email: '',
    password: '',
    password_confirmation: ''
  }, registerUser, null, onSubmitSuccess )

  //* HandleSubmit event for submitting the login form
  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await registerUser(formData)
      setToken(res.data.token)
      console.log(res, 'register success')
    } catch (err) {
      setError(err.response.data )
    }
  }

  return (
    <FormWrapper 
      textAlign='center'
      verticalAlign='middle'
      formWidth='450'
      titleSize='h1'
      color='pink'
      formTitle='Register Here'
      onSubmit={handleSubmit}
    >
      <FormInput 
        error={formErrors.username}
        fluidIcon = 'user'
        iconPosition = 'left'
        placeholder= 'Username'
        value = {formData.username || ''}
        type = 'text'
        name = 'username'
        onChange={handleChange}
      />
      <FormInput 
        error={formErrors.first_name}
        fluidIcon = 'address card outline'
        iconPosition = 'left'
        placeholder= 'First Name'
        value = {formData.first_name || ''}
        type = 'text'
        name = 'first_name'
        onChange={handleChange}
      />
      <FormInput 
        error={formErrors.last_name}
        fluidIcon = 'address card'
        iconPosition = 'left'
        placeholder= 'Last Name'
        value = {formData.last_name || ''}
        type = 'text'
        name = 'last_name'
        onChange={handleChange}
      />
      <FormInput 
        error={formErrors.email}
        fluidIcon = 'envelope'
        iconPosition = 'left'
        placeholder= 'Email address'
        value = {formData.email || ''}
        type = 'text'
        name = 'email'
        onChange={handleChange}
      />
      <FormInput
        error={formErrors.password}
        fluidIcon ='lock'
        iconPosition ='left'
        placeholder='Password'
        value={formData.password || ''}
        type='password'
        name='password'
        onChange={handleChange}
      />
      <FormInput
        error={formErrors.password_confirmation}
        fluidIcon ='lock'
        iconPosition ='left'
        placeholder='Password Confirmation'
        value={formData.password_confirmation || ''}
        type='password'
        name='password_confirmation'
        onChange={handleChange}
      />
      <FormButton
        fluidSize='large'
        color='pink'
        buttonText='Register Now' 
        type='submit'
      ></FormButton>
      <p>Already have an account?<Link to="/login"> Log In</Link></p>
    </FormWrapper>
  )
}
export default Register