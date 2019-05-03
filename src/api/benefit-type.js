import request from '@/utils/request'

export function fetchBenefitTypeList(query) {
  return request({
    url: '/benefit-type/list',
    method: 'get',
    params: query
  })
}

export function fetchSubBenefitTypeList(query) {
  return request({
    url: '/benefit-type/sub-benefit/list',
    method: 'get',
    params: query
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

