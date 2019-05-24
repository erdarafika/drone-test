import request from '@/utils/request'

export function fetchCountryList() {
  return request({
    url: 'master/country',
    method: 'get'
  })
}
export function fetchProvinceList(countryIdList) {
  return Promise.all(countryIdList.map(countryId => {
    return request({
      url: `/master/country/${countryId}/province`,
      method: 'get'
    }).then((res) => {
      res = res.map(i => {
        i['countryId'] = countryId
        return i
      })
      return res
    }).catch(err => {
      console.log(`fail to fetch on country id : ${countryId}`, err)
    })
  }))
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
export function createProvince({ name, countryId }) {
  return request({
    url: `/master/country/${countryId}/province`,
    method: 'post',
    data: {
      name
    }
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
export function updateProvince({ id, name, countryId }) {
  return request({
    url: `/master/country/${countryId}/province/${id}`,
    method: 'post',
    data: {
      name
    }
  })
}
export function updateCity(data) {
  return request({
    url: '/city/update',
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

export function deleteProvince({ countryId, id }) {
  return request({
    url: `/master/country/${countryId}/province/${id}`,
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
