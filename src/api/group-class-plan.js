import request from '@/utils/request'

export function fetchList(id) {
  return request({
    url: `/company/group/${id}/class-plan`,
    method: `get`
  })
}

export function createGroupClassPlan(data) {
  return request({
    url: `/company/group/${data.groupId}/class-plan`,
    method: `post`,
    data
  })
}

export function updateGroupClassPlan(data) {
  return request({
    url: `/company/group/${data.groupId}/class-plan/${data.id}`,
    method: `post`,
    data
  })
}

export function deleteGroupClassPlan(data) {
  return request({
    url: `/company/group/${data.groupId}/class-plan/${data.id}`,
    method: `delete`
  })
}
