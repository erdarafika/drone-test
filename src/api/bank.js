import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/master/bank',
    method: 'get'
  })
}

export function fetchBranch(bank_id) {
  return request({
    url: `/master/bank/${bank_id}/branch`,
    method: 'get'
  })
}

export function createBranch(data, bank_id) {
  return request({
    url: `/master/bank/${bank_id}/branch`,
    method: 'post',
    data
  })
}

export function fetchBank(id) {
  return request({
    url: '/bank/detail',
    method: 'get',
    params: { id }
  })
}

export function createBank(data) {
  return request({
    url: '/master/bank',
    method: 'post',
    data
  })
}

export function updateBank(data) {
  return request({
    url: `/master/bank/${data.id}`,
    method: 'post',
    data
  })
}

export function deleteBank(data) {
  return request({
    url: `/master/bank/${data.id}`,
    method: 'delete'
  })
}

export function updateStatusBank(data) {
  return request({
    url: `/master/bank/${data.id}/update-status`,
    method: 'post',
    data
  })
}

export function deleteBranch(data) {
  return request({
    url: `master/bank/${data.bank.id}/branch/${data.id}`,
    method: 'delete'
  })
}
