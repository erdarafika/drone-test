import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/membership',
    method: 'get',
    params: query
  })
}

export function fetchMembershipById(id) {
  return request({
    url: `/membership/${id}`,
    method: 'get'
  })
}

