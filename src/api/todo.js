import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/todolist',
    method: 'get'
  })
}
