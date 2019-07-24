import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/user',
    method: 'get'
  })
}

export function fetchRecord(id) {
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

export function updateUserPrivileges(data) {
  return request({
    url: `/user/${data.id}/update-previleges`,
    method: 'post',
    data
  })
}

export function disableUser(data) {
  return request({
    url: `/user/${data.id}/disable-user`,
    method: 'post'
  })
}

export function resetUserPassword(data) {
  return request({
    url: `/user/${data.id}/reset-password`,
    method: 'post',
    data
  })
}
