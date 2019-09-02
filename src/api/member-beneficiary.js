import request from '@/utils/request'

export function fetchList(id) {
  return request({
    url: `/membership/${id}/beneficiary`,
    method: 'get'
  })
}

export function saveMemberBeneficiary(data) {
  return request({
    url: `/membership/${data.memberId}/beneficiary`,
    method: 'post',
    data
  })
}

export function updateMemberBeneficiary(data) {
  return request({
    url: `/membership/${data.memberId}/beneficiary/${data.id}`,
    method: 'post'
  })
}

