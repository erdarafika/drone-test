import request from '@/utils/request'

export function fetchList(id) {
  return request({
    url: `/company/${id}/bank`,
    method: `get`
  })
}

export function createCompanyBankAccount(data) {
  return request({
    url: `/company/${data.companyId}/bank`,
    method: `post`,
    data
  })
}

export function updateCompanyBankAccount(data) {
  return request({
    url: `/company/${data.companyId}/bank/${data.id}`,
    method: `post`,
    data
  })
}

export function deleteCompanyBankAccount(data) {
  return request({
    url: `/company/${data.companyId}/bank/${data.id}`,
    method: `delete`
  })
}
