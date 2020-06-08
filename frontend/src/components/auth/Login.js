import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import useForm from '../../utils/useForm'
import FormWrapper from '../common/FormWrapper'
import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

function Login() {
  //*State
  const [formError, setError] = useState(null)
  const history = useHistory()
  
  //* 'State' & props for useForm 
  const { formData, handleChange } = useForm({
    email: '',
    password: ''
  })


  //* HandleSubmit event for submitting the login form
  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await loginUser(formData)
      setToken(res.data.token)
      history.push('/jobs')
    } catch (err) {
      setError('Invalid Credentials' )
    }
  }

  return (
    <div className='Login'>
      <FormWrapper 
        textAlign='center'
        verticalAlign='middle'
        formWidth='450'
        titleSize='h1'
        color='pink'
        formTitle='Login Here'
        onSubmit={handleSubmit}>
        <FormInput 
          error={formError}
          fluidIcon = 'envelope'
          iconPosition = 'left'
          placeholder= 'Email address'
          value = {formData.email || ''}
          type = 'text'
          name = 'email'
          onChange={handleChange}
        />
        <FormInput
          error={formError}
          fluidIcon ='lock'
          iconPosition ='left'
          placeholder='Password'
          value={formData.password || ''}
          type='password'
          name='password'
          onChange={handleChange}
        />
        <FormButton
          fluidSize='large'
          color='pink'
          buttonText='Login Now' 
          type='submit'
        ></FormButton>
        <p>Dont have an account?<Link to="/register"> Sign Up</Link></p>
      </FormWrapper>
    </div>
  )
}
export default Login