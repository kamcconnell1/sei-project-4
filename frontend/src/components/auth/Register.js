import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import useForm from '../../utils/useForm'
import FormWrapper from '../common/FormWrapper'
import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import { registerUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

function Register() {
  const history = useHistory()

  const onSubmitSuccess = response => {
    console.log(response, 'with token?') 
    setToken(response.data.token)
    history.push('/jobs')
  }

  //* initalFormState & props for useForm hook
  const { formData, formErrors, handleChange, handleSubmit } = useForm({
    username: '',
    firstName: '', 
    lastName: '', 
    email: '',
    password: '',
    passwordConfirmation: ''
  }, registerUser, null, onSubmitSuccess )

  console.log(formErrors)

  return (
    <FormWrapper 
      textAlign='center'
      verticalAlign='middle'
      formWidth='450'
      titleSize='h2'
      color='pink'
      formTitle='Register Here'
      onSubmit={handleSubmit}
    >
      <FormInput 
        error={!!formErrors}
        fluidIcon = 'user'
        iconPosition = 'left'
        placeholder= 'Username'
        value = {formData.username || ''}
        type = 'text'
        name = 'username'
        onChange={handleChange}
      />
      <FormInput 
        // error={formErrors.firstName}
        fluidIcon = 'user'
        iconPosition = 'left'
        placeholder= 'First Name'
        value = {formData.firstName || ''}
        type = 'text'
        name = 'firstName'
        onChange={handleChange}
      />
      <FormInput 
        // error={formErrors.lastName}
        fluidIcon = 'user'
        iconPosition = 'left'
        placeholder= 'Last Name'
        value = {formData.lastName || ''}
        type = 'text'
        name = 'lastName'
        onChange={handleChange}
      />
      <FormInput 
        // error={formErrors.email}
        fluidIcon = 'user'
        iconPosition = 'left'
        placeholder= 'Email address'
        value = {formData.email || ''}
        type = 'text'
        name = 'email'
        onChange={handleChange}
      />
      <FormInput
        // error={formErrors.password}
        fluidIcon ='lock'
        iconPosition ='left'
        placeholder='Password'
        value={formData.password || ''}
        type='password'
        name='password'
        onChange={handleChange}
      />
      <FormInput
        // error={formErrors.passwordConfirmation}
        fluidIcon ='lock'
        iconPosition ='left'
        placeholder='Password Confirmation'
        value={formData.passwordConfirmation || ''}
        type='password'
        name='passwordConfirmation'
        onChange={handleChange}
      />
      <FormButton
        fluidSize='large'
        color='pink'
        buttonText='Register Now' 
        type='submit'
      ></FormButton>
    </FormWrapper>
  )
}
export default Register