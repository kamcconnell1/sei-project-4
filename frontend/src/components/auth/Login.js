import React from 'react'
import { Header, Grid } from 'semantic-ui-react'

import FormWrapper from '../common/FormWrapper'
import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

class Login extends React.Component {
  state = {
    formData: {
      email: '',
      password: ''
    },
    error: ''
  }

  //* HandleChange event for inputting values on form 
  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData, error: '' })
  }

  //* HandleSubmit event for submitting the login form
  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await loginUser(this.state.formData)
      setToken(res.data.token)
      console.log(res, 'logged in success')
    } catch (err) {
      this.setState({ error: 'Invalid Credentials' })
    }
  }

  render() {

    const { email, password } = this.state.formData
    const error  = this.state.error

    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='pink'>Login Here</Header>
          <FormWrapper onSubmit={this.handleSubmit}>
            <FormInput 
              error={error}
              fluidIcon = 'user'
              iconPosition = 'left'
              placeholder= 'Email address'
              type = 'text'
              name = 'email'
              value = {email}
              onChange={this.handleChange}
            />
            <FormInput
              error={error}
              fluidIcon ='lock'
              iconPosition ='left'
              placeholder='Password'
              type='password'
              name='password'
              value={password}
              onChange={this.handleChange}
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
}

export default Login