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

export const registerUser = (data) => {
  return axios.post(`${baseUrl}/auth/register/`, data)
}

// * JOB REQUESTS

export const getAllJobs = () => {
  return axios.get(`${baseUrl}/jobs/`, withHeaders())
}

export const getSingleJob = id => {
  return axios.get(`${baseUrl}/jobs/${id}/`, withHeaders())
}

export const editJob = (data, id) => {
  return axios.put(`${baseUrl}/jobs/${id}/`, data, withHeaders())
}

// * TASK REQUESTS

export const getAllTasks = () => {
  return axios.get(`${baseUrl}/tasks/`, withHeaders())
}

export const getSingleTask = id => {
  return axios.get(`${baseUrl}/tasks/${id}`, withHeaders())
}

export const editTask =  (data, id) => {
  return axios.put(`${baseUrl}/tasks/${id}/`, data, withHeaders())
}

export const deleteTask = id => {
  return axios.delete(`${baseUrl}/tasks/${id}/`, withHeaders())
}


// * CONTACTS REQUESTS

export const getAllContacts = () => {
  return axios.get(`${baseUrl}/contacts`, withHeaders())
}


// * RESOURCES REQUESTS

export const getAllResources = () => {
  return axios.get(`${baseUrl}/resources`, withHeaders())
}