import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: `/company/group/${data.id}/fee`,
    method: 'get',
    data
  })
}

export function createGroupFee(data) {
  return request({
    url: `/company/group/${data.id}/fee`,
    method: 'post',
    data
  })
}

export function getSingleGroupFee(data) {
  return request({
    url: `/company/group/${data.id}/fee/${data.feeId}`,
    method: 'get',
    data
  })
}

export function updateGroupFee(data) {
  return request({
    url: `/company/group/${data.id}/fee/${data.feeId}`,
    method: 'post',
    data
  })
}

export function deleteGroupFee(data) {
  return request({
    url: `/company/group/${data.id}/fee/${data.feeId}`,
    method: 'delete'
  })
}
