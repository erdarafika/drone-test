import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/master/document-type',
    method: 'get'
  })
}

export function fetchReason(id) {
  return request({
    url: `/master/document-type/${id}/rejection-reason`,
    method: 'get'
  })
}

export function createReason(data) {
  return request({
    url: `/master/document-type/${data.id}/rejection-reason`,
    method: 'post',
    data
  })
}

export function deleteReason(data) {
  return request({
    url: `/master/document-type/${data.documentId}/rejection-reason/${data.id}`,
    method: 'delete'
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
    url: '/master/document-type',
    method: 'post',
    data
  })
}

export function updateDocument(data) {
  return request({
    url: `/master/document-type/${data.id}`,
    method: 'post',
    data
  })
}

export function deleteDocument({ id }) {
  return request({
    url: `/master/document-type/${id}`,
    method: 'delete'
  })
}
