import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/fund/investment-type',
    method: 'get'
  })
}

export function fetchInvestmentType(id) {
  return request({
    url: `/fund/investment-type/${id}`,
    method: 'get'
  })
}

export function createInvestmentType(data) {
  return request({
    url: '/fund/investment-type',
    method: 'post',
    data
  })
}

export function updateInvestmentType(data) {
  return request({
    url: `/fund/investment-type/${data.id}`,
    method: 'post',
    data
  })
}

export function deleteInvestmentType(data) {
  return request({
    url: `/fund/investment-type/${data.id}`,
    method: 'delete'
  })
}

// UNIT PRICE

// export function createUnitPrice(data) {
//   return request({
//     url: '/unit-price/create',
//     method: 'post',
//     data
//   })
// }

export function fetchUnitPriceList() {
  return request({
    url: '/portfolio/daily-unit-price',
    method: 'get'
  })
}
