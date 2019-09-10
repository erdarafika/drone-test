import request from '@/utils/request'

export function fetchList(id) {
  return request({
    url: `/company/group/${id}/fund-policy`,
    method: 'get'
  })
}

export function createOrUpdate(data) {
  return request({
    url: `/company/group/${data.id}/fund-policy`,
    method: 'post',
    data
  })
}
