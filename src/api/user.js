import request from '@/utils/request'
import axios from 'axios'
import qs from 'qs'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function loginOauth2({ username, password }) {
  const data = qs.stringify({
    username,
    password,
    grant_type: 'password'
  })

  const clientData = {
    secret: 'secret',
    id: 'razor'
  }

  axios.post(
    'http://localhost:8080/oauth/token',
    data,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': 'Basic ' + btoa(`${clientData.id}:${clientData.secret}`)
      }
    }).then(result => {
    console.log(result)
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
