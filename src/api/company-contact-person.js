import request from '@/utils/request'

export function fetchList(id) {
  return request({
    url: `/company/${id}/correspondence`,
    method: `get`
  })
}

export function createCompanyContactPerson(data) {
  return request({
    url: `/company/${data.companyId}/correspondence`,
    method: `post`,
    data
  })
}

export function updateCompanyContactPerson(data) {
  return request({
    url: `/company/${data.companyId}/correspondence/${data.id}`,
    method: `post`,
    data
  })
}

export function deleteCompanyContactPerson(data) {
  return request({
    url: `/company/${data.companyId}/correspondence/${data.id}`,
    method: `delete`
  })
}
