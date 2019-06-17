import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/user',
    method: 'get'
  })
}

export function fetchUser(id) {
  return request({
    url: `/user/${id}`,
    method: 'get'
  })
}

export function createUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function updateUserMenu(data) {
  return request({
    url: `/user/${data.id}/update-menu/`,
    method: 'post',
    data
  })
}

export function disableUser(data) {
  return request({
    url: `/user/${data.id}/disable-user/`,
    method: 'post'
  })
}

export function updateUserRole(data) {
  return request({
    url: `/user/${data.id}/update-role/`,
    method: 'post',
    data
  })
}
