/* eslint-disable camelcase */
import React from 'react'
import { Label } from 'semantic-ui-react'
import { taskCategories } from '../tasks/TaskCategories'

function TaskLabel(category) {

  // console.log(category)
  
  const string = category.category
  // console.log(string)
  
  // const jobCategory = str.replace(/ /g,'_').toLowerCase()
  // console.log(jobCategory)

  const filterCategories = (array, string) => {
    return array.filter(item => {
      if (item.value === string) {
        return item
      }
    })
  }
  const filteredCategory = filterCategories(taskCategories, string)
  // console.log(filteredCategory)
  
  const text = filteredCategory[0].text
  const color = filteredCategory[0].label.color

  return (
    <Label color={color}>{text}</Label>
  )
}

export default TaskLabel
