import request from '@/utils/request'

// ---------------- COUNTRY Section

export function fetchCountryList() {
  return request({
    url: '/master/country',
    method: 'get'
  })
}

export function createCountry(data) {
  return request({
    url: '/master/country',
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

export function deleteCountry({ id }) {
  return request({
    url: `/master/country/${id}`,
    method: 'delete'
  })
}

export function updateStatusCountry(data) {
  return request({
    url: `/master/country/${data.id}/update-status`,
    method: 'post',
    data
  })
}

// ---------------- CITY Section

export function fetchCityListById({ countryId, provinceId }) {
  return request({
    url: `/master/country/${countryId}/province/${provinceId}/city`,
    method: 'get'
  })
}
export function fetchCityList(countryId, provinceId) {
  return request({
    url: `/master/country/${countryId}/province/${provinceId}/city`,
    method: 'get'
  })
}

export function createCity({ name, countryId, provinceId }) {
  return request({
    url: `/master/country/${countryId}/province/${provinceId}/city`,
    method: 'post',
    data: {
      name
    }
  })
}

export function updateCity(data, countryId, provinceId, id) {
  return request({
    url: `/master/country/${countryId}/province/${provinceId}/city/${id}`,
    method: 'post',
    data
  })
}

export function deleteCity({ countryId, provinceId, id }) {
  return request({
    url: `/master/country/${countryId}/province/${provinceId}/city/${id}`,
    method: 'delete'
  })
}

export function updateStatusCity(data) {
  return request({
    url: `/master/country/${data.countryId}/province/${data.provinceId}/city/${data.id}/update-status`,
    method: 'post',
    data
  })
}

// ---------------- PROVINCE Section

export function fetchProvinceListById(countryId) {
  return request({
    url: `/master/country/${countryId}/province`,
    method: 'get'
  })
}

export function fetchProvinceList(countryId) {
  return request({
    url: `/master/country/${countryId}/province`,
    method: 'get'
  })
}

export function createProvince({ name, countryId }) {
  return request({
    url: `/master/country/${countryId}/province`,
    method: 'post',
    data: {
      name
    }
  })
}

export function updateProvince({ id, name, countryId }) {
  return request({
    url: `/master/country/${countryId}/province/${id}`,
    method: 'post',
    data: {
      name
    }
  })
}

export function deleteProvince({ countryId, id }) {
  return request({
    url: `/master/country/${countryId}/province/${id}`,
    method: 'delete'
  })
}

export function updateStatusProvince(data) {
  return request({
    url: `/master/country/${data.countryId}/province/${data.id}/update-status`,
    method: 'post',
    data
  })
}
