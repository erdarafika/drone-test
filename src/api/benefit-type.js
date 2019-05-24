import request from '@/utils/request'

export function fetchBenefitTypeList() {
  return request({
    url: '/master/benefit-type',
    method: 'get'
  })
}

export function fetchSubBenefitTypeList(id) {
  return request({
    url: `/master/benefit/type/${id}/sub-benefit-type    `,
    method: 'get'
  })
}

export function fetchSubBenefitDocument(query) {
  return request({
    url: '/benefit-type/sub-benefit/document/list',
    method: 'get',
    params: query
  })
}

export function fetchBenefitType(id) {
  return request({
    url: '/benefit-type/detail',
    method: 'get',
    params: { id }
  })
}

export function createBenefitType(data) {
  return request({
    url: '/benefit-type/create',
    method: 'post',
    data
  })
}

