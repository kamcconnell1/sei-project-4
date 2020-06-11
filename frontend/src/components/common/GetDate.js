/* eslint-disable camelcase */
import React from 'react'


// !! NOT WORKING PROPERLY NEED TO COME BACK TO
function GetDate(date) {

  const today_date = new Date().getTime()
  const formatted_date = (new Date(date).getTime())
  const microSecondsDiff = Math.abs(formatted_date - today_date)
  
  // ! NEED TO UPDATE THIS ONE SO HAVE DATES IN SAME FORMAT TO COMPARE
  if (date === today_date) 
    return <p className='due-today'>0 days</p>

  if (formatted_date > today_date) 
    return <p className='due'>{Math.floor(microSecondsDiff / (1000 * 60 * 60 * 24))} days</p>
  
  if (formatted_date < today_date) 
    return <p className='overdue'>{Math.floor(microSecondsDiff / (1000 * 60 * 60 * 24))} days ago</p>

}

export default GetDate