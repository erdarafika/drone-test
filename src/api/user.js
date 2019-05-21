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

export function loginOauth2() {
  const data = qs.stringify({
    username: 'admin',
    password: 'password',
    grant_type: 'password'
  })

  axios.post(
    'http://localhost:8080/oauth/token',
    data,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        // "Accept": "application/json",
        'Authorization': 'Basic ' + btoa('razor:secret')
      }
    }).then(result => {
    console.log(result)
  })
  // return request({
  //   url: 'http://razor:secret@localhost:8080/oauth/token',
  //   method: 'post',
  //   data: {
  //     username: 'admin',
  //     password: 'password',
  //     grant_type: 'password'
  //   }
  // })
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
