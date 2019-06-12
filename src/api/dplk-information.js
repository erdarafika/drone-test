import request from '@/utils/request'

export function fetchDplkInformation() {
  return request({
    url: '/master/dplk/1',
    method: 'get'
  })
}

export function updateDplkInformation(data) {
  return request({
    url: '/master/dplk',
    method: 'post',
    data
  })
}
