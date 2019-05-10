import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/dplk-staff/list',
    method: 'get',
    params: query
  })
}

export function createDplkStaff(data) {
  return request({
    url: '/dplk-staff/create',
    method: 'post',
    data
  })
}

export function updateDplkStaff(data) {
  return request({
    url: '/dplk-staff/update',
    method: 'post',
    data
  })
}
