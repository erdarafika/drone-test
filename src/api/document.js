import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/document/list',
    method: 'get',
    params: query
  })
}

export function fetchReason(query) {
  return request({
    url: '/document/reason/list',
    method: 'get',
    params: query
  })
}

export function createReason(data) {
  return request({
    url: '/document/reason/create',
    method: 'post',
    data
  })
}

export function fetchDocument(id) {
  return request({
    url: '/document/detail',
    method: 'get',
    params: { id }
  })
}

export function createDocument(data) {
  return request({
    url: '/document/create',
    method: 'post',
    data
  })
}

export function updateDocument(data) {
  return request({
    url: '/document/update',
    method: 'post',
    data
  })
}
