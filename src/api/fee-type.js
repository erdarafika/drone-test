import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/fee/type',
    method: 'get'
  })
}
