import request from '@/utils/request'

export function fetchList(memberId) {
  return request({
    url: `membership/${memberId}/bank`,
    method: 'get'
  })
}

export function createRecord(data) {
  return request({
    url: `membership/${data.memberId}/bank`,
    method: 'post',
    data
  })
}

export function getRecord(data) {
  return request({
    url: `membership/${data.memberId}/bank/${data.id}`,
    method: 'get'
  })
}

export function updateRecord(data) {
  return request({
    url: `membership/${data.memberId}/bank/${data.id}`,
    method: 'post',
    data
  })
}

export function deleteRecord(data) {
  return request({
    url: `membership/${data.memberId}/bank/${data.id}`,
    method: 'delete'
  })
}
