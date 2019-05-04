import request from '@/utils/request'

export function fetchVirtualAccount(query) {
  return request({
    url: '/virtual-account/detail',
    method: 'get',
    params: query
  })
}

export function updateVirtualAccount(data) {
  return request({
    url: '/virtual-account/update',
    method: 'post',
    data
  })
}
