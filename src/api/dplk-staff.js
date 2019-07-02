import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/master/dplk/staff',
    method: 'get'
  })
}

export function createDplkStaff(data) {
  return request({
    url: '/master/dplk/staff',
    method: 'post',
    data
  })
}

export function updateDplkStaff(data) {
  return request({
    url: `/master/dplk/staff/${data.id}`,
    method: 'post',
    data
  })
}

export function deleteDplkStaff(data) {
  return request({
    url: `/master/dplk/staff/${data.id}`,
    method: 'delete'
  })
}
