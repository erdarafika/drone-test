import request from '@/utils/request'

export function fetchList(id) {
  return request({
    url: `/company/group/${id}/billing`,
    method: `get`
  })
}

export function createGroupBilling(data) {
  return request({
    url: `/company/group/${data.groupId}/billing`,
    method: `post`,
    data
  })
}

export function updateGroupBilling(data) {
  return request({
    url: `/company/group/${data.groupId}/billing/${data.id}`,
    method: `post`,
    data
  })
}

export function deleteGroupBilling(data) {
  return request({
    url: `/company/group/${data.groupId}/billing/${data.id}`,
    method: `delete`
  })
}
