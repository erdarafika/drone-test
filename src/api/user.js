// import request from '@/utils/request'
import axios from 'axios'
import qs from 'qs'

// export function login(data) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data
//   })
// }

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
    'http://localhost:8080/oauth/token',
    data,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': 'Basic ' + btoa(`${clientData.id}:${clientData.secret}`)
      }
    })
}

export function getInfo(token) {
  // const users = {
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTg2NjQ5MDYsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9NQUtFUiIsIlJPTEVfQVBQUk9WRVIiLCJTVVBFUlVTRVIiLCJST0xFX0NIRUNLRVIiXSwianRpIjoiODY2YTRlNzAtMTU4ZC00N2UyLTk5N2UtNzZjMTI0ZGMzZDBkIiwiY2xpZW50X2lkIjoicmF6b3IiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.FQgIYj67eHsbmCXHTZ4c62R7ZjlPED_lQ9UoF2_kGL8': {
  //     roles: ['admin'],
  //     introduction: 'I am a super administrator',
  //     avatar: 'https://imgbbb.com/images/2019/04/29/man-1.png',
  //     name: 'Super Admin',
  //     crudPermissions: ['maker','checkher']
  //   },
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTg2NjUwNTAsInVzZXJfbmFtZSI6InBlbnNpdW5rdSIsImF1dGhvcml0aWVzIjpbIlJPTEVfTUFLRVIiLCJST0xFX09QUyIsIlJPTEVfQVBQUk9WRVIiLCJST0xFX0NIRUNLRVIiXSwianRpIjoiOWY3MDdjZWUtNDY3ZS00MWRhLWJlM2EtMGM1YjZmYzc3MWI5IiwiY2xpZW50X2lkIjoicmF6b3IiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.ZTkKUjOAWn28MZ7-c88UT-W4nogfOMCcI4riELfxT1k': {
  //     roles: ['admin'],
  //     introduction: 'I am an approver',
  //     avatar: 'https://imgbbb.com/images/2019/04/29/man-1.png',
  //     name: 'Normal Approver',
  //     crudPermissions: ['approver']
  //   }
  // }

  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // })

  // console.log('user',user[token])
  return new Promise((resolve, reject) => {
    if (!token) { reject('no token') }

    setTimeout(resolve({
      data: {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://imgbbb.com/images/2019/04/29/man-1.png',
        name: 'Super Admin',
        crudPermissions: ['maker', 'checkher']
      }
    }), 300)
  })
}

export function logout() {
  // return request({
  //   url: '/user/logout',
  //   method: 'post'
  // })

  return new Promise((resolve, reject) => {
    resolve(
      {
        data: 'success'
      }
    )
  })
}
