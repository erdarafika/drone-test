import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/fee/type',
    method: 'get'
    // params: query
  })
}
