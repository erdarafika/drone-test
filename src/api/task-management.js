import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/task',
    method: 'get'
  })
}

export function fetchTask(id) {
  return request({
    url: `/task/${id}`,
    method: 'get'
  })
}

export function approveTask(id) {
  return request({
    url: `/task/${id}/approve`,
    method: 'patch'
  })
}

export function rejectTask(id) {
  return request({
    url: `/task/${id}/reject`,
    method: 'patch'
  })
}
