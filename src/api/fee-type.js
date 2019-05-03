import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/fee-type/list',
    method: 'get',
    params: query
  })
}
