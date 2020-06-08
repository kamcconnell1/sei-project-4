import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { getAllJobs } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import useWindowSize from '../../utils/useWindowSize'
import JobIndexBoard from './JobIndexBoard'
import { mobileView, smallTabletView, largeTabletView, desktopView } from '../../lib/boardViews'
import { wishlistView, appliedView, interviewView, offerView, rejectedView } from '../../lib/mobileViews'



function JobIndex() {
  const { data: jobs, loading, error } = useFetch(getAllJobs)
  const { width } = useWindowSize()
  const [statuses, setStatuses] = useState(desktopView)

  useEffect(() => {
    if (width <= 480) {
      setStatuses(mobileView)
    } else if (width <= 768) {
      setStatuses(smallTabletView)
    } else if (width <= 1200) {
      setStatuses(largeTabletView)
    } else {
      setStatuses(desktopView)
    }
  }, [width])

  // const handleBoardChange = e => {
  //   e.preventDefault()
  //   console.log('I want to change board', e.target.value)
  // }

  const handleBoardChangeMobile = e => {
    e.preventDefault()
    if (e.target.value === 'left' && e.target.name === 'wishlist') {
      setStatuses(rejectedView)
    } else if (e.target.value === 'right' && e.target.name === 'wishlist') {
      setStatuses(appliedView)
    } else if (e.target.value === 'left' && e.target.name === 'applied') {
      setStatuses(wishlistView)
    } else if (e.target.value === 'right' && e.target.name === 'applied') {
      setStatuses(interviewView)
    } else if (e.target.value === 'left' && e.target.name === 'interview') {
      setStatuses(appliedView)
    } else if (e.target.value === 'right' && e.target.name === 'interview') {
      setStatuses(offerView)
    } else if (e.target.value === 'left' && e.target.name === 'offer') {
      setStatuses(interviewView)
    } else if (e.target.value === 'right' && e.target.name === 'offer') {
      setStatuses(rejectedView)
    } else if (e.target.value === 'left' && e.target.name === 'rejected') {
      setStatuses(offerView)
    } else {
      setStatuses(wishlistView)
    }
  }

  if (error) {
    return <Redirect to="/notfound" />
  }

  if (!jobs) return null

  return (

    <>
      {loading ?
        <h1>LOADING</h1>
        :
        <div className="JobIndex">


          {/* <div className="button-container">
            <button
              onClick={handleBoardChange}
              value='Left'
            >L</button>
          </div>
          <div className="button-container">
            <button
              onClick={handleBoardChange}
            >R</button>
          </div> */}
          <div className="job-boards">
            {statuses.map((status => {
              return (
                <JobIndexBoard
                  key={status.name}
                  jobData={jobs}
                  status={status}
                  handleBoardChangeMobile={handleBoardChangeMobile}
                />
              )
            }))}
          </div>
        </div>
      }
    </>
  )

}

export default JobIndex