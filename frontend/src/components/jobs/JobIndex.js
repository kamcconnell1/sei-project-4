import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { getAllJobs } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import useWindowSize from '../../utils/useWindowSize'
import JobIndexBoard from './JobIndexBoard'
import { mobileView, smallTabletView, largeTabletView, desktopView } from '../../lib/boardViews'
import { wishlistView, appliedView, interviewView, offerView, rejectedView } from '../../lib/mobileViews'
import { smallTabletViewTwo, smallTabletViewThree, smallTabletViewFour, smallTabletViewFive } from '../../lib/smallTabletViews'



function JobIndex() {
  const { data: jobs, loading, error } = useFetch(getAllJobs)
  const { width } = useWindowSize()
  const [statuses, setStatuses] = useState(desktopView)
  const [currentSmallTabletView, setCurrentSmallTabletView] = useState(smallTabletView)

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

  const handleBoardChangeSmallTablet = e => {
    e.preventDefault()
    if (currentSmallTabletView === smallTabletView && e.target.value === 'right') {
      setCurrentSmallTabletView(smallTabletViewTwo)
      setStatuses(smallTabletViewTwo)
    }
    if (currentSmallTabletView === smallTabletViewTwo && e.target.value === 'right') {
      setCurrentSmallTabletView(smallTabletViewThree)
      setStatuses(smallTabletViewThree)
    }
    if (currentSmallTabletView === smallTabletViewThree && e.target.value === 'right') {
      setCurrentSmallTabletView(smallTabletViewFour)
      setStatuses(smallTabletViewFour)
    }
    if (currentSmallTabletView === smallTabletViewFour && e.target.value === 'right') {
      setCurrentSmallTabletView(smallTabletViewFive)
      setStatuses(smallTabletViewFive)
    }
    if (currentSmallTabletView === smallTabletViewFive && e.target.value === 'right') {
      setCurrentSmallTabletView(smallTabletView)
      setStatuses(smallTabletView)
    }
    if (currentSmallTabletView === smallTabletView && e.target.value === 'left') {
      setCurrentSmallTabletView(smallTabletViewFive)
      setStatuses(smallTabletViewFive)
    }
    if (currentSmallTabletView === smallTabletViewTwo && e.target.value === 'left') {
      setCurrentSmallTabletView(smallTabletView)
      setStatuses(smallTabletView)
    }
    if (currentSmallTabletView === smallTabletViewThree && e.target.value === 'left') {
      setCurrentSmallTabletView(smallTabletViewTwo)
      setStatuses(smallTabletViewTwo)
    }
    if (currentSmallTabletView === smallTabletViewFour && e.target.value === 'left') {
      setCurrentSmallTabletView(smallTabletViewThree)
      setStatuses(smallTabletViewThree)
    }
    if (currentSmallTabletView === smallTabletViewFive && e.target.value === 'left') {
      setCurrentSmallTabletView(smallTabletViewFour)
      setStatuses(smallTabletViewFour)
    }
  }

  const handleBoardChangeLargeTablet = e => {
    e.preventDefault()
    console.log('I want to change board', e.target.value)
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
          <div className="button-container-small-tablet">
            <button
              onClick={handleBoardChangeSmallTablet}
              value='left'
            >L-smalltab</button>
          </div>
          <div className="button-container-small-tablet">
            <button
              onClick={handleBoardChangeSmallTablet}
              value='right'
            >R-smalltab</button>
          </div>
          <div className="button-container-large-tablet">
            <button
              onClick={handleBoardChangeLargeTablet}
              value='left'
            >L-largetab</button>
          </div>
          <div className="button-container-large-tablet">
            <button
              onClick={handleBoardChangeLargeTablet}
              value='right'
            >R-largetab</button>
          </div>
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