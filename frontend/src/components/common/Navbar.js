import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  Container,
  Menu,
  Dropdown,
  Image
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
      <div>
        <Menu size='small' position='right' borderless>
          <Container >
            <Dropdown item simple text='Menu' >
              <Dropdown.Menu>
                {isAuthenticated() &&
                  <>
                    <Link to='/jobs'>
                      <Dropdown.Item>
                        Jobs
                      </Dropdown.Item>
                    </Link>
                    <Link to='/tasks'>
                      <Dropdown.Item>
                        Tasks
                      </Dropdown.Item>
                    </Link>
                    <Link to='/contacts'>
                      <Dropdown.Item>
                        Contacts
                      </Dropdown.Item>
                    </Link>
                    <Link to='/resources'>
                      <Dropdown.Item>
                        Resources
                      </Dropdown.Item>
                    </Link>
                  </>}
                <Dropdown.Divider />
                <Dropdown.Header>Account</Dropdown.Header>
                {!isAuthenticated() &&
                  <>
                    <Link to='/login'>
                      <Dropdown.Item>
                        Log In
                      </Dropdown.Item>
                    </Link>
                    <Link to='/register'>
                      <Dropdown.Item>
                        Register
                      </Dropdown.Item>
                    </Link>
                  </>}
                {isAuthenticated() && <Dropdown.Item onClick={this.handleLogout}>
                      Log Out
                </Dropdown.Item>}
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item id='navbar-logo' position='right'>
              <Image size='tiny' src={logo} alt='jobr-logo' />
            </Menu.Item>
          </Container>
        </Menu>
      </div >
    )
  }
}

export default withRouter(Navbar)