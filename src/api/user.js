import axios from 'axios'
import qs from 'qs'
import request from '@/utils/request'

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

  return axios.post(
    'http://api.pensioncore.com/oauth/token',
    data,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': 'Basic ' + btoa(`${clientData.id}:${clientData.secret}`)
      }
    })
}

export function getInfo(token) {
  return request({
    url: '/user/me',
    method: 'get'
  })
}

export function logout() {
  return new Promise((resolve, reject) => {
    resolve(
      {
        data: 'success'
      }
    )
  })
}
