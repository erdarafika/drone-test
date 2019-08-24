import request from '@/utils/request'

export function createOrUpdateRecord(data) {
  return request({
    url: `membership/${data.memberId}/billing`,
    method: 'post',
    data
  })
}

export function getRecord(memberId) {
  return request({
    url: `membership/${memberId}/billing`,
    method: 'get'
  })
}
