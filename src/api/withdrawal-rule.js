import request from '@/utils/request'

export function fetchWithdrawalRule(query) {
  return request({
    url: '/withdrawal-rule/detail',
    method: 'get',
    params: query
  })
}

export function updateWithdrawalRule(data) {
  return request({
    url: '/withdrawal-rule/update',
    method: 'post',
    data
  })
}
