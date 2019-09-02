import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/membership',
    method: 'get',
    params: query
  })
}

export function fetchMembershipById(id) {
  return request({
    url: `/membership/${id}`,
    method: 'get'
  })
}

export function updateMembership(data) {
  return request({
    url: `membership/${data.id}`,
    method: 'post',
    data
  })
}

export function deleteMembership(id) {
  return request({
    url: `membership/${id}`,
    method: 'delete'
  })
}

export function previewImport(data) {
  return request({
    url: 'membership/upload',
    method: 'post',
    headers: {
      'X-Import-Process': false,
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

export function processImport(data) {
  return request({
    url: 'membership/upload',
    method: 'post',
    headers: {
      'X-Import-Process': true,
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

export function exportExcel(query) {
  return request({
    url: '/membership/export',
    method: 'get',
    responseType: 'blob',
    params: query
  })
}
