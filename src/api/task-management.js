import request from '@/utils/request'

export function fetchList(query) {
  console.log('query', query)
  return request({
    url: '/task',
    method: 'get',
    params: query
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

export function rejectTask(data) {
  return request({
    url: `/task/${data.id}/reject`,
    method: 'patch',
    data
  })
}
