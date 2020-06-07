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
              <Link to="/tasks">Tasks</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/contacts">Con</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/resources">Res</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/login">Logn</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/register">Reg</Link>
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    )
  }
}

export default Navbar