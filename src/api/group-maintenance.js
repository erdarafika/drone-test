import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/company/group',
    method: 'get',
    params: query
  })
}

export function fetchGroupMaintanance(id) {
  return request({
    url: `company/group/${id}`,
    method: 'get'
  })
}

export function createGroupMaintanance(data) {
  return request({
    url: '/company/group',
    method: 'post',
    data
  })
}

export function updateGroupMaintanance(data) {
  return request({
    url: `/company/group/${data.id}`,
    method: 'post',
    data
  })
}

export function deleteGroupMaintanance(data) {
  return request({
    url: `/company/group/${data.id}`,
    method: 'delete'
  })
}

export function approveGroupMaintanance(id) {
  return request({
    url: `/company/group/${id}/request-approval`,
    method: 'post'
  })
}
