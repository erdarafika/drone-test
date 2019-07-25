import request from '@/utils/request'

export function fetchMathConfig(query) {
  return request({
    url: '/master/math-configuration',
    method: 'get',
    params: query
  })
}
