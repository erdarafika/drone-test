import request from '@/utils/request'

export function fetchInvestmentTypeList(query) {
  return request({
    url: '/fund/investment-type',
    method: 'get',
    params: query
  })
}

export function fetchInvestmentType(id) {
  return request({
    url: '/investment-type/detail',
    method: 'get',
    params: { id }
  })
}

export function createInvestmentType(data) {
  return request({
    url: '/investment-type/create',
    method: 'post',
    data
  })
}

export function updateInvestmentType(data) {
  return request({
    url: '/investment-type/update',
    method: 'post',
    data
  })
}

// UNIT PRICE

export function createUnitPrice(data) {
  return request({
    url: '/unit-price/create',
    method: 'post',
    data
  })
}

export function fetchUnitPriceList(query) {
  return request({
    url: '/unit-price/list',
    method: 'get',
    params: query
  })
}
