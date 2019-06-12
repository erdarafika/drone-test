import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/master/money-source',
    method: 'get'
  })
}
