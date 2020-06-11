import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  Container,
  Menu,
  Dropdown,
  Image, Sticky
} from 'semantic-ui-react'
import logo from '../../assets/jobr-logo.png'
import { logout, isAuthenticated } from '../../lib/auth'



class Navbar extends React.Component {


  handleLogout = () => {
    logout()
    this.props.history.push('/')
  }


  render() {
    return (
      <Sticky>
        <Menu size='small' position='right' borderless >
          <Container >
            <Dropdown item simple text='Menu' >
              <Dropdown.Menu>
                {isAuthenticated() &&
                  <>
                    <Link to='/jobs'>
                      <Dropdown.Item id='navbar-btn1' >
                        Jobs
                      </Dropdown.Item>
                    </Link>
                    <Link to='/tasks'>
                      <Dropdown.Item id='navbar-btn2'>
                        Tasks
                      </Dropdown.Item>
                    </Link>
                    <Link to='/contacts'>
                      <Dropdown.Item id='navbar-btn3'>
                        Contacts
                      </Dropdown.Item>
                    </Link>
                    <Link to='/resources'>
                      <Dropdown.Item id='navbar-btn4'>
                        Resources
                      </Dropdown.Item>
                    </Link>
                  </>}
                <Dropdown.Divider />
                <Dropdown.Header id='navbar-account'>Account</Dropdown.Header>
                {!isAuthenticated() &&
                  <>
                    <Link to='/login'>
                      <Dropdown.Item id='navbar-btn5'>
                        Log In
                      </Dropdown.Item>
                    </Link>
                    <Link to='/register'>
                      <Dropdown.Item id='navbar-btn6'>
                        Register
                      </Dropdown.Item>
                    </Link>
                  </>}
                {isAuthenticated() && <Dropdown.Item onClick={this.handleLogout} >
                  Log Out
                </Dropdown.Item>}
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item id='navbar-logo' position='right'>
              <Link to='/'>
                <Image size='tiny' src={logo} alt='jobr-logo' />
              </Link>
            </Menu.Item>
          </Container>
        </Menu>
      </Sticky >
    )
  }
}

export default withRouter(Navbar)