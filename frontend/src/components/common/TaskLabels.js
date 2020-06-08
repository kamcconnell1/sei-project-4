/* eslint-disable camelcase */
import React from 'react'
import { Label } from 'semantic-ui-react'
import { taskCategories } from '../tasks/TaskCategories'

function TaskLabels(category) {
  
  const job_category = category.category
  // console.log(job_category)
  // console.log(taskCategories)
  
  const labelColour = () => {
    if (job_category === 'Prep CV') return 'orange'

    // 'red',
    // 'orange',
    // 'yellow',
    // 'olive',
    // 'green',
    // 'teal',
    // 'blue',
    // 'violet',
    // 'purple',
    // 'pink',
    // 'brown',
    // 'grey',
    // 'black',
  }
  
  // const filterCategories = (array, string) => {
  //   return array.filter(item => {
  //     item.text === string
  //   })
  // }
  
  const task = job_category.toLowerCase().replace(' ', '_')
  
  const filterCategories = (array, string) => {
    return array.filter(item => {
      if (item.key === string) {
        return item
      }  
    })
  }

  const returnedItem = filterCategories(taskCategories, task)
  console.log(returnedItem)


  const color = labelColour(job_category)
  
  return (
    <Label color={color}>{job_category}</Label>
    // <h1>Hello</h1>
  )
}

export default TaskLabels
