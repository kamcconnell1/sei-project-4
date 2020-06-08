import React from 'react'

import { getAllJobs } from '../../lib/api'
// import JobIndexCard from './JobIndexCard'
import JobIndexBoard from './JobIndexBoard'


const statuses = ['wishlist', 'applied', 'interview', 'offer', 'rejected']

class JobIndex extends React.Component {
  state = {
    jobs: null,
    width: null
  }

  async componentDidMount() {
    try {
      const res = await getAllJobs()
      this.setState({ jobs: res.data, width: window.innerWidth })
    } catch (err) {
      console.log(err)
    }
  }

  handleBoardChange = e => {
    e.preventDefault()
    console.log('I want to change board', e.target.value)
  }

  handleBoardChangeMobile = e => {
    e.preventDefault()
    if (e.target.value === 'left' && e.target.name === 'wishlist') {
      console.log(e.target.value, 'TO:', statuses[statuses.length - 1])
    } else if (e.target.value === 'right' && e.target.name === 'rejected') {
      console.log(e.target.value, 'TO:', statuses[0])
    } else if (e.target.value === 'left') {
      console.log(e.target.value, 'TO:', statuses[statuses.indexOf(e.target.name) - 1])
    } else {
      console.log(e.target.value, 'TO:', statuses[statuses.indexOf(e.target.name) + 1])
    }
    
  }
  

  render() {

    if (!this.state.jobs) return null

    console.log(this.state.width)
    

    return (
      <div className="JobIndex">
        <div className="button-container">
          <button
            onClick={this.handleBoardChange}
            value='Left'
          >L</button>
        </div>
        <div className="button-container">
          <button
            onClick={this.handleBoardChange}
          >R</button>
        </div>
        <div className="job-boards">
          {statuses.map((status => {
            return (
              <JobIndexBoard
                key={status}
                jobData={this.state.jobs}
                status={status}
                handleBoardChangeMobile={this.handleBoardChangeMobile}
              />
            )
          }))}
        </div>

      </div>
    )
  }
}

export default JobIndex