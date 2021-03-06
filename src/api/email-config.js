import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/master/email',
    method: 'get'
  })
}

export function fetchEmailConfig(data) {
  return request({
    url: `/master/email/${data.id}`,
    method: 'get'
  })
}

export function createEmailConfig(data) {
  return request({
    url: '/master/email',
    method: 'post',
    data
  })
}

export function updateEmailConfig(data) {
  return request({
    url: `/master/email/${data.id}`,
    method: 'post',
    data
  })
}

export function deleteEmailConfig(data) {
  return request({
    url: `/master/email/${data.id}`,
    method: 'delete'
  })
}

export function fetchAttachment(id) {
  return request({
    url: `/master/email/${id}/attachment`,
    method: 'get'
  })
}

export function deleteAttachment(data) {
  return request({
    url: `/master/email/${data.emailId}/attachment/${data.id}`,
    method: 'delete'
  })
}

export function createAttachment(data, id) {
  return request({
    url: `/master/email/${id}/attachment`,
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
