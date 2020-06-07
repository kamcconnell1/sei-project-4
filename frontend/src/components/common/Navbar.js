import React from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Menu
} from 'semantic-ui-react'

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <Menu >
          <Container>
            <Menu.Item>
              <Link to="/jobs" className="button">Jobs</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/tasks">Tasks</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/contacts">Contacts</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/resources">Resources</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/login">Log In</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/register">Register</Link>
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    )
  }
}

export default Navbar