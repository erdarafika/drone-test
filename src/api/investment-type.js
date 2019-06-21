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

export function createUnitPrice({ effectiveDate, data }) {
  console.log(data, effectiveDate)
  return Promise.all(data.map(unitPrice => {
    return request({
      url: `/fund/investment-type/${unitPrice.key}/daily-unit-price`,
      method: 'post',
      data: {
        effectiveDate: effectiveDate,
        investmentTypeId: unitPrice.key,
        price: unitPrice.value
      }
    }).then((res) => {
      res['status_code'] = 200 // FIXME: doesnt have default status code
      return res
    }).catch(err => {
      console.log(err)
    })
  }))
}

export function fetchUnitPriceList() {
  return request({
    url: '/portfolio/daily-unit-price',
    method: 'get'
  })
}
