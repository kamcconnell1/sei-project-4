import axios from 'axios'

const baseUrl = '/api'



//* USER REQUESTS

//? LOGIN  user
export const loginUser = data => {
  return axios.post(`${baseUrl}/auth/login/`, data)
}