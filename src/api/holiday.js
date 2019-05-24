import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/master/holiday',
    method: 'get'
  })
}

export function createHoliday(data) {
  return request({
    url: '/master/holiday',
    method: 'post',
    data
  })
}

export function updateHoliday(data) {
  return request({
    url: `/master/holiday/${data.id}`,
    method: 'post',
    data
  })
}

export function deleteHoliday(data) {
  return request({
    url: `/master/holiday/${data.id}`,
    method: 'delete'
  })
}
