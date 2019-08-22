import request from '@/utils/request'

export function fetchList(memberId) {
  return request({
    url: `membership/${memberId}/billing`,
    method: 'get'
  })
}

export function createRecord(data) {
  return request({
    url: `membership/${data.memberId}/billing`,
    method: 'post',
    data
  })
}

export function getRecord(data) {
  return request({
    url: `membership/${data.memberId}/billing/${data.id}`,
    method: 'get'
  })
}

export function updateRecord(data) {
  return request({
    url: `membership/${data.memberId}/billing/${data.id}`,
    method: 'post',
    data
  })
}

export function deleteRecord(data) {
  return request({
    url: `membership/${data.memberId}/billing/${data.id}`,
    method: 'delete'
  })
}
