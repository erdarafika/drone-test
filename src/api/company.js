import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/company',
    method: 'get'
  })
}

export function fetchCompany(id) {
  return request({
    url: `company/${id}`,
    method: 'get'
  })
}

export function approveCompany(id) {
  return request({
    url: `/company/${id}/request-approval`,
    method: 'post'
  })
}

export function createCompany(data) {
  return request({
    url: '/company',
    method: 'post',
    data
  })
}

export function updateCompany(data) {
  return request({
    url: `/company/${data.id}`,
    method: 'post',
    data
  })
}

export function deleteCompany(data) {
  return request({
    url: `/company/${data.id}`,
    method: 'delete'
  })
}

export function exportExcel() {
  return request({
    url: '/company/export',
    method: 'get',
    responseType: 'blob'
  })
}
