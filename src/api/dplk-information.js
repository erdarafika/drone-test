import request from '@/utils/request'

export function fetchDplkInformation(query) {
  return request({
    url: '/dplk-information/detail',
    method: 'get',
    params: query
  })
}

export function updateDplkInformation(data) {
  return request({
    url: '/dplk-information/update',
    method: 'post',
    data
  })
}
