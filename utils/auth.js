import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const Loginkey = 'is-Login'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getLogin() {
  return Cookies.get(Loginkey)
}

export function setLogin(data) {
  return Cookies.set(Loginkey, data)
}
