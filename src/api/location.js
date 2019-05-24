import request from '@/utils/request'

export function fetchCountryList() {
  return request({
    url: 'master/country',
    method: 'get'
  })
}
export function fetchProvinceList(countryIdList) {
  // const provinceRequestList = []

  // countryIdList.forEach(countryId => {
  //   provinceRequestList.push(
  //     request({
  //       url: `/master/country/${countryId}/province`,
  //       method: 'get'
  //     }).then((res) => {
  //       return res
  //     }).catch(err => {
  //       console.log(`fail to fetch on country id : ${countryId}`)
  //     })
  //   )
  // })

  // Promise.all(provinceRequestList).then(res => {
  //   console.log(res)
  // })

  return request({
    url: '/province/list',
    method: 'get'
  })
}
export function fetchCityList(query) {
  return request({
    url: '/city/list',
    method: 'get',
    params: query
  })
}
export function createCountry(data) {
  return request({
    url: '/master/country',
    method: 'post',
    data
  })
}
export function createProvince(data) {
  return request({
    url: '/province/create',
    method: 'post',
    data
  })
}
export function createCity(data) {
  return request({
    url: '/city/create',
    method: 'post',
    data
  })
}

export function updateCountry(data) {
  return request({
    url: `/master/country/${data.id}`,
    method: 'post',
    data
  })
}
export function updateProvince(data) {
  return request({
    url: '/province/update',
    method: 'post',
    data
  })
}
export function updateCity(data) {
  return request({
    url: '/city/update',
    method: 'post',
    data
  })
}

export function deleteCountry(data) {
  return request({
    url: `/master/country/${data.id}`,
    method: 'delete'
  })
}

export function fetchProvince(id) {
  return request({
    url: '/province/detail',
    method: 'get',
    params: { id }
  })
}
export function fetchCountry(id) {
  return request({
    url: '/country/detail',
    method: 'get',
    params: { id }
  })
}
