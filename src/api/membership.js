import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/membership',
    method: 'get'
  })
}

export function fetchMembershipById(id) {
  return request({
    url: `/membership/${id}`,
    method: 'get'
  })
}
