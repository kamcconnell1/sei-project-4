import React, { useState } from 'react'
import { Header, Grid } from 'semantic-ui-react'

import useForm from '../../utils/useForm'
import FormWrapper from '../common/FormWrapper'
import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

function Login() {
  //*'State'
  const [error, setError] = useState(null)

  //* 'State' & props for useForm 
  const { formData, handleChange } = useForm({
    email: '',
    password: ''
  })


  // state = {
  //   formData: {
  //     email: '',
  //     password: ''
  //   },
  //   error: ''
  // }

  // //* HandleChange event for inputting values on form 
  // handleChange = event => {
  //   const formData = { ...this.state.formData, [event.target.name]: event.target.value }
  //   this.setState({ formData, error: '' })
  // }

  //* HandleSubmit event for submitting the login form
  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await loginUser(formData)
      setToken(res.data.token)
      console.log(res, 'logged in success')
    } catch (err) {
      setError('Invalid Credentials' )
    }
  }





  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='pink'>Login Here</Header>
        <FormWrapper onSubmit={handleSubmit}>
          <FormInput 
            error={error}
            fluidIcon = 'user'
            iconPosition = 'left'
            placeholder= 'Email address'
            value = {formData.email || ''}
            type = 'text'
            name = 'email'
            onChange={handleChange}
          />
          <FormInput
            error={error}
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
        </FormWrapper>
      </Grid.Column>
    </Grid>
  )
}
export default Login