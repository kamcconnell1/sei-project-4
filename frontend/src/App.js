import React from 'react'

class App extends React.Component{

  async componentDidMount() {
    try {
      const res = await fetch('/api/jobs/')
      const json = await res.json()
      console.log(json)
    } catch (err) {
      console.log(err)
    
    }
  }


  render(){
    return (
      <h1> Hello world </h1>
    )
  }
}

export default App