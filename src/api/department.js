import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/master/department',
    method: 'get'
  })
}

export function createDepartment(data) {
  return request({
    url: '/master/department',
    method: 'post',
    data
  })
}

export function updateDepartment(data) {
  return request({
    url: `/master/department/${data.id}`,
    method: 'post',
    data
  })
}

export function deleteDepartment(data) {
  return request({
    url: `/master/department/${data.id}`,
    method: 'delete'
  })
}
