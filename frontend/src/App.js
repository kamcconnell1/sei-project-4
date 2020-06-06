import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

class App extends React.Component {

  async componentDidMount() {
    try {
      const res = await fetch('/api/jobs/')
      const json = await res.json()
      console.log(json)
    } catch (err) {
      console.log(err)

    }
  }


  render() {
    return (
      <Button animated>
        <Button.Content visible>CHECKIng what happens if i put more words in</Button.Content>
        <Button.Content hidden>
          <Icon name='arrow right' />
        </Button.Content>
      </Button>
    )
  }
}

export default App