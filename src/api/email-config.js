import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/email-config/list',
    method: 'get',
    params: query
  })
}

export function fetchEmailConfig(id) {
  return request({
    url: '/email-config/detail',
    method: 'get',
    params: { id }
  })
}

export function createEmailConfig(data) {
  return request({
    url: '/email-config/create',
    method: 'post',
    data
  })
}

export function updateEmailConfig(data) {
  return request({
    url: '/email-config/update',
    method: 'post',
    data
  })
}
