import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}


//* USER REQUESTS

//? LOGIN  user
export const loginUser = data => {
  return axios.post(`${baseUrl}/auth/login/`, data)
}


// * JOB REQUESTS

export const getAllJobs = () => {
  return axios.get(`${baseUrl}/jobs/`, withHeaders())
}

export const getSingleJob = id => {
  return axios.get(`${baseUrl}/jobs/${id}`, withHeaders())
}
