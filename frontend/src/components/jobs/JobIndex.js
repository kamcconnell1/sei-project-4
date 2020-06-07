import React from 'react'

import { getAllJobs } from '../../lib/api'
// import JobIndexCard from './JobIndexCard'
import JobIndexBoard from './JobIndexBoard'

class JobIndex extends React.Component {
  state = {
    jobs: null,
    statuses: ['wishlist', 'applied', 'interview', 'offer', 'rejected']
  }

  async componentDidMount() {
    try {
      const res = await getAllJobs()
      this.setState({ jobs: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  

  render() {

    if (!this.state.jobs) return null

    return (
      <div className="JobIndex">
        <div className="job-boards">
          {this.state.statuses.map((status => {
            return (
              <JobIndexBoard
                key={status}
                jobData={this.state.jobs}
                status={status}
              />
            )
          }))}
        </div>
      </div>
    )
  }
}

export default JobIndex