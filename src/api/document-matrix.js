import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/document-matrix/list',
    method: 'get',
    params: query
  })
}

export function createDocumentMatrix(data) {
  return request({
    url: '/document-matrix/create',
    method: 'post',
    data
  })
}

export function updateDocumentMatrix(data) {
  return request({
    url: '/document-matrix/update',
    method: 'post',
    data
  })
}
