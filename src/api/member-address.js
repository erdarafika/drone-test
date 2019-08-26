import request from '@/utils/request'

export function fetchList(id) {
  return request({
    url: `membership/${id}/address`,
    method: 'get'
  })
}

export function createRecord(data) {
  return request({
    url: `membership/${data.memberId}/address`,
    method: 'post',
    data
  })
}

export function getRecord(data) {
  return request({
    url: `membership/${data.memberId}/address/${data.id}`,
    method: 'get'
  })
}

export function updateRecord(data) {
  return request({
    url: `membership/${data.memberId}/address/${data.id}`,
    method: 'post',
    data
  })
}

export function deleteRecord(data) {
  return request({
    url: `membership/${data.memberId}/address/${data.id}`,
    method: 'delete'
  })
}
