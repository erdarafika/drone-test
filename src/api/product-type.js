import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/product-type/list',
    method: 'get',
    params: query
  })
}
