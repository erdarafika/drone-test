import request from '@/utils/request'

export function fetchList() {
  return request({
    url: 'log-user',
    method: 'get'
  })
}
