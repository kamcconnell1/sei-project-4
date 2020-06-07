import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}


//* USER REQUESTS

export const loginUser = data => {
  return axios.post(`${baseUrl}/auth/login/`, data)
}

export const registerUser = data => {
  console.log(data)
  
  return axios.post(`${baseUrl}/auth/register/`, data)
}

// * JOB REQUESTS

export const getAllJobs = () => {
  return axios.get(`${baseUrl}/jobs/`, withHeaders())
}

export const getSingleJob = id => {
  return axios.get(`${baseUrl}/jobs/${id}`, withHeaders())
}

export const editJob = (id, formData) => {
  return axios.put(`${baseUrl}/jobs/${id}`, formData, withHeaders())
}
