/* eslint-disable camelcase */
import React from 'react'
import { Label } from 'semantic-ui-react'
import { taskCategories } from '../tasks/TaskCategories'

function TaskLabel(category) {
  const str = category.category
  const jobCategory = str.replace(/ /g,'_').toLowerCase()

  const filterCategories = (array, string) => {
    return array.filter(item => {
      if (item.key === string) {
        return item
      }  
    })
  }
  const filteredCategory = filterCategories(taskCategories, jobCategory)
  const color = filteredCategory[0].label.color
  
  return (
    <Label color={color}>{jobCategory}</Label>
  )
}

export default TaskLabel
