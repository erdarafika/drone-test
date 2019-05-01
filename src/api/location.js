import request from '@/utils/request'

export function fetchCountryList(query) {
  return request({
    url: '/country/list',
    method: 'get',
    params: query
  })
}
export function fetchProvinceList(query) {
  return request({
    url: '/province/list',
    method: 'get',
    params: query
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
    url: '/country/create',
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
    url: '/country/update',
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
