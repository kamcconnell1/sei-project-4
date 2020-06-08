/* eslint-disable camelcase */


function GetDate(date) {

  const today_date = new Date().getTime()
  const reminder_date = (new Date(date).getTime())
  const microSecondsDiff = Math.abs(reminder_date - today_date)

  if (reminder_date > today_date) return `Due in: ${Math.floor(microSecondsDiff / (1000 * 60 * 60 * 24))} days`
  if (reminder_date < today_date) return `Overdue by: ${Math.floor(microSecondsDiff / (1000 * 60 * 60 * 24))} days`

}

export default GetDate