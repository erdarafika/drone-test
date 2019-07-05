import request from '@/utils/request'

export function fetchGroupWithdrawal(id) {
  return request({
    url: `company/group/${id}/withdrawal-rule`,
    method: 'get'
  })
}

export function updateGroupWithdrawal(data, id) {
  return request({
    url: `company/group/${id}/withdrawal-rule`,
    method: 'post',
    data
  })
}
