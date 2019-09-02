import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/master/dplk/bank',
    method: 'get'
  })
}

export function getDplkBankAccount(dplkBankId) {
  return request({
    url: `/master/dplk/bank/${dplkBankId}`,
    method: 'get'
  })
}

export function createDplkBankAccount(data) {
  return request({
    url: '/master/dplk/bank',
    method: 'post',
    data
  })
}

export function updateDplkBankAccount(data) {
  return request({
    url: `/master/dplk/bank/${data.id}`,
    method: 'post',
    data
  })
}

export function updateStatusDplkBankAccount(data) {
  return request({
    url: `/master/dplk/bank/${data.id}/update-status`,
    method: 'post',
    data
  })
}

export function deleteDplkBankAccount(data) {
  return request({
    url: `/master/dplk/bank/${data.id}`,
    method: 'delete'
  })
}
