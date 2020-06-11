import React, { useState, useEffect } from 'react'

import { getAllJobs, getSingleJob, editJob, deleteJob } from '../../lib/api'
import { mobileView, smallTabletView, largeTabletView, desktopView } from '../../lib/boardViews'
import { wishlistView, appliedView, interviewView, offerView, rejectedView } from '../../lib/mobileViews'
import { smallTabletViewTwo, smallTabletViewThree, smallTabletViewFour, smallTabletViewFive } from '../../lib/smallTabletViews'
import { largeTabletViewTwo, largeTabletViewThree, largeTabletViewFour, largeTabletViewFive } from '../../lib/largeTabletViews'
import useWindowSize from '../../utils/useWindowSize'
import JobIndexBoard from './JobIndexBoard'
import DeleteConfirmModal from '../common/DeleteConfirmModal'
import JobNewModal from './JobNewModal'



function JobIndex() {
  const [jobs, setJobs] = useState(null)
  const { width } = useWindowSize()
  const [statuses, setStatuses] = useState(desktopView)
  const [currentSmallTabletView, setCurrentSmallTabletView] = useState(smallTabletView)
  const [currentLargeTabletView, setCurrentLargeTabletView] = useState(largeTabletView)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [jobToDelete, setJobToDelete] = useState(null)
  const [addNewModalOpen, setAddNewModalOpen] = useState(false)
  const [newJobCategory, setNewJobCategory] = useState(null)


  const getData = async () => {
    try {
      const res = await getAllJobs()
      setJobs(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (width <= 480) {
      setStatuses(mobileView)
    } else if (width <= 768) {
      setStatuses(smallTabletView)
    } else if (width <= 1120) {
      setStatuses(largeTabletView)
    } else {
      setStatuses(desktopView)
    }
  }, [width])

  const handleNewJobModal = e => {
    e.preventDefault()
    setAddNewModalOpen(true)
    setNewJobCategory(e.currentTarget.value)
  }

  const handleNewJobModalClose = () => {
    setAddNewModalOpen(false)
    getData()
  }


  const handleDeleteJob = async () => {
    try {
      await deleteJob(jobToDelete)
      setDeleteModalOpen(false)
    } catch (err) {
      console.log(err)
    }
    getData()
  }

  const handleDeleteConfirmModal = e => {
    e.preventDefault()
    setJobToDelete(e.currentTarget.value)
    setDeleteModalOpen(true)
  }

  const handleCloseDeleteConfirm = () => {
    setDeleteModalOpen(false)
  }

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
    if (currentLargeTabletView === largeTabletView && e.target.value === 'right') {
      setCurrentLargeTabletView(largeTabletViewTwo)
      setStatuses(largeTabletViewTwo)
    }
    if (currentLargeTabletView === largeTabletViewTwo && e.target.value === 'right') {
      setCurrentLargeTabletView(largeTabletViewThree)
      setStatuses(largeTabletViewThree)
    }
    if (currentLargeTabletView === largeTabletViewThree && e.target.value === 'right') {
      setCurrentLargeTabletView(largeTabletViewFour)
      setStatuses(largeTabletViewFour)
    }
    if (currentLargeTabletView === largeTabletViewFour && e.target.value === 'right') {
      setCurrentLargeTabletView(largeTabletViewFive)
      setStatuses(largeTabletViewFive)
    }
    if (currentLargeTabletView === largeTabletViewFive && e.target.value === 'right') {
      setCurrentLargeTabletView(largeTabletView)
      setStatuses(largeTabletView)
    }
    if (currentLargeTabletView === largeTabletView && e.target.value === 'left') {
      setCurrentLargeTabletView(largeTabletViewFive)
      setStatuses(largeTabletViewFive)
    }
    if (currentLargeTabletView === largeTabletViewTwo && e.target.value === 'left') {
      setCurrentLargeTabletView(largeTabletView)
      setStatuses(largeTabletView)
    }
    if (currentLargeTabletView === largeTabletViewThree && e.target.value === 'left') {
      setCurrentLargeTabletView(largeTabletViewTwo)
      setStatuses(largeTabletViewTwo)
    }
    if (currentLargeTabletView === largeTabletViewFour && e.target.value === 'left') {
      setCurrentLargeTabletView(largeTabletViewThree)
      setStatuses(largeTabletViewThree)
    }
    if (currentLargeTabletView === largeTabletViewFive && e.target.value === 'left') {
      setCurrentLargeTabletView(largeTabletViewFour)
      setStatuses(largeTabletViewFour)
    }
  }


  const drop = async dropEvent => {
    dropEvent.persist()
    dropEvent.preventDefault()
    const jobId = dropEvent.dataTransfer.getData('jobId')
    const jobToUpdate = await getSingleJob(jobId)
    const newStatus = dropEvent.target.id
    if (!newStatus) return
    await editJob({ ...jobToUpdate.data, status: newStatus }, jobId)
    getData()
  }

  if (!jobs) return null

  return (

    <>
      <DeleteConfirmModal
        deleteModalOpen={deleteModalOpen}
        handleCloseDeleteConfirm={handleCloseDeleteConfirm}
        nameOfThingToDelete='Job'
        handleDelete={handleDeleteJob}
      />
      <JobNewModal
        addNewModalOpen={addNewModalOpen}
        handleNewJobModalClose={handleNewJobModalClose}
      />
      <div className="JobIndex">
        <div className="button-container-small-tablet right">
          <button
            className='tablet-btn left'
            onClick={handleBoardChangeSmallTablet}
            value='left'
          >&lt;</button>
        </div>
        <div className="button-container-small-tablet right">
          <button
            className='tablet-btn right'
            onClick={handleBoardChangeSmallTablet}
            value='right'
          >&gt;</button>
        </div>
        <div className="button-container-large-tablet left">
          <button
            className='tablet-btn left'
            onClick={handleBoardChangeLargeTablet}
            value='left'
          >&lt;</button>
        </div>
        <div className="button-container-large-tablet right">
          <button
            className='tablet-btn right'
            onClick={handleBoardChangeLargeTablet}
            value='right'
          >&gt;</button>
        </div>
        <div className="job-boards">
          {statuses.map((status => {
            return (
              <JobIndexBoard
                key={status.name}
                jobData={jobs}
                status={status}
                handleDeleteConfirmModal={handleDeleteConfirmModal}
                handleBoardChangeMobile={handleBoardChangeMobile}
                handleNewJobModal={handleNewJobModal}
                drop={drop}
              />
            )
          }))}
        </div>
      </div>

    </>
  )

}

export default JobIndex