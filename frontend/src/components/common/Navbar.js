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
              <Link to="/jobs">J</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/tasks">T</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/contacts">C</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/resources">R</Link>
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