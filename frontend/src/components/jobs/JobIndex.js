import React from 'react'

import { getAllJobs } from '../../lib/api'
import JobIndexCard from './JobIndexCard'

class JobIndex extends React.Component {
  state = {
    jobs: null
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

    console.log(this.state.jobs)

    return (
      <div>
        <h1>WISHLIST</h1>
        {this.state.jobs.map((job => {
          return (
            <JobIndexCard key={job.id} {...job} />
          )
        }))
        }
      </div>
    )
  }
}

export default JobIndex