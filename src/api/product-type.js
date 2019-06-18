import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/master/product-type',
    method: 'get'
  })
}

export function createProductType(data) {
  return request({
    url: '/master/product-type',
    method: 'post',
    data
  })
}

export function updateProductType(data) {
  return request({
    url: `/master/product-type/${data.id}`,
    method: 'post',
    data
  })
}

export function deleteProductType(data) {
  return request({
    url: `/master/product-type/${data.id}`,
    method: 'delete'
  })
}
