import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/todolist',
    method: 'get'
  })
}

export function createTodo(data) {
  return request({
    url: '/todolist',
    method: 'post',
    data
  })
}

export function deleteTodo(data) {
  return request({
    url: `/todolist/${data.id}`,
    method: 'delete'
  })
}

export function updateTodo(data) {
  return request({
    url: `/todolist/${data.id}`,
    method: 'post',
    data: data
  })
}

export function updateTodoStatus(data) {
  return request({
    url: `/todolist/${data.id}/update-status`,
    method: 'post',
    data: data
  })
}

