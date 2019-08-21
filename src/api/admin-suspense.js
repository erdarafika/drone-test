import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/admin-suspense',
    method: 'get'
  })
}

export function createAdminSuspense(data) {
  return request({
    url: '/admin-suspense',
    method: 'post',
    data
  })
}

export function fetchById(id) {
  return request({
    url: `/admin-suspense/${id}`,
    method: 'get'
  })
}

export function matchingSuspense(data) {
  return request({
    url: '/admin-suspense/matching',
    method: 'post',
    data
  })
}
