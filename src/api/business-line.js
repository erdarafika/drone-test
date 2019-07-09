import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/master/business-line',
    method: 'get'
  })
}

export function fetchBusinessLine(id) {
  return request({
    url: `/master/business-line/${id}`,
    method: 'get'
  })
}

export function createBusinessLine(data) {
  return request({
    url: '/master/business-line',
    method: 'post',
    data
  })
}

export function updateBusinessLine(data) {
  return request({
    url: `/master/business-line/${data.id}`,
    method: 'post',
    data
  })
}

export function updateStatusBusinessLine(data) {
  return request({
    url: `/master/business-line/${data.id}/update-status`,
    method: 'post',
    data
  })
}

export function deleteBusinessLine(data) {
  return request({
    url: `/master/business-line/${data.id}`,
    method: 'delete'

  })
}
