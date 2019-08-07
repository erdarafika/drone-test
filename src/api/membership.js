import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/membership',
    method: 'get'
  })
}
