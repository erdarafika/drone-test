import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/master/dplk/1/bank',
    method: 'get'
  })
}

export function createDplkBankAccount(data) {
  return request({
    url: '/master/dplk/1/bank',
    method: 'post',
    data
  })
}

export function updateDplkBankAccount(data) {
  return request({
    url: `/master/dplk/1/bank/${data.id}`,
    method: 'post',
    data
  })
}

export function deleteDplkBankAccount(data) {
  return request({
    url: `/master/dplk/1/bank/${data.id}`,
    method: 'delete'
  })
}
