import request from '@/utils/request'

export function createContribution(data) {
  return request({
    url: '/simulation/contribution',
    method: 'post',
    data
  })
}
