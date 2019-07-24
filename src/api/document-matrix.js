import request from '@/utils/request'

export function fetchDocumentMatrix(id) {
  return request({
    url: `/master/document-type/${id}/transaction`,
    method: 'get'
  })
}

export function createDocumentMatrix(data) {
  return request({
    url: `/master/document-type/${data.id}/transaction`,
    method: 'post',
    data
  })
}

export function deleteDocumentMatrix(data) {
  return request({
    url: `/master/document-type/${data.documentId}/transaction/${data.id}`,
    method: 'delete'
  })
}
