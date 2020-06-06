import React from 'react'
import { Header, Form, Grid, Button } from 'semantic-ui-react'

class Login extends React.Component {



  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='pink'>Login Here</Header>
          <Form size='large' className="Login">
            <Form.Input
              fluid icon='user'
              iconPosition='left'
              placeholder='email address'
            />
            <Form.Input 
              fluid icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password' 
            />
            <Button 
              fluid size='large'
              basic color='pink' 
              content='Login Now'/>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Login