import request from '@/utils/request'

export function fetchWithdrawalRule() {
  return request({
    url: '/master/withdrawal-rule',
    method: 'get'
  })
}

export function updateWithdrawalRule(data) {
  return request({
    url: '/master/withdrawal-rule',
    method: 'post',
    data
  })
}
