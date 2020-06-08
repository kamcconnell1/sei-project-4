//* Function to set users token when logged in local sotrage
export const setToken = token => {
  console.log(token)
  console.log(snakeToCamel(token))
  console.log(token)
  window.localStorage.setItem('token', token)
}

const snakeToCamel = (str) => str.replace(
  /([-_][a-z])/g
)


export const getToken = () => {
  return window.localStorage.getItem('token')
}

export const logout = () => {
  localStorage.removeItem('token')
}

export const getPayload = () => { // * returns the decoded data from the token or false
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3) return false
  return JSON.parse(window.atob(parts[1]))
}

export const isOwner = id => {
  const userId = getPayload().sub
  return id === userId
}

export const getUserId = () => {
  return getPayload().sub
}

export const isAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const now = Math.round(Date.now() / 1000)
  return now < payload.exp
}