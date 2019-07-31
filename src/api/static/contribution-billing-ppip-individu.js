export function createRecord(data) {
  console.log('create', data)
  return Promise.resolve({ status_code: 200 })
}

export function approveRecord(data) {
  console.log('approve', data)
  return Promise.resolve({ status_code: 200 })
}
