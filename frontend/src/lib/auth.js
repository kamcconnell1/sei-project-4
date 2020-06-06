//* Function to set users token when logged in local sotrage
export const setToken = token => {
  window.localStorage.setItem('token', token)
}
