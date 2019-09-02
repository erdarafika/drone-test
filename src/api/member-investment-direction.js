import request from '@/utils/request'

export function fetchList(id) {
  return request({
    url: `/membership/${id}/investment-direction`,
    method: 'get'
  })
}

export function saveMemberInvestmentDirection(data) {
  return request({
    url: `/membership/${data.memberId}/investment-direction`,
    method: 'post',
    data
  })
}
