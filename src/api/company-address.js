import request from '@/utils/request'

export function fetchList(id) {
  return request({
    url: `/company/${id}/address`,
    method: `get`
  })
}

export function createCompanyAddress(data) {
  return request({
    url: `/company/${data.companyId}/address`,
    method: `post`,
    data
  })
}

export function updateCompanyAddress(data) {
  return request({
    url: `/company/${data.companyId}/address/${data.id}`,
    method: `post`,
    data
  })
}

export function deleteCompanyAddress(data) {
  return request({
    url: `/company/${data.companyId}/address/${data.id}`,
    method: `delete`
  })
}
