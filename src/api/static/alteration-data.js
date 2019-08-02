
export function fetchList() {
  const data = [{ id: 1, dataName: 'Data Name', documentName: 'Document Name', created_at: new Date(), status: '✓' }]
  return Promise.resolve(data || [])
}

export function createRecord(data) {
  console.log('create', data)
  return Promise.resolve({ status_code: 200 })
}

export function approveRecord(data) {
  console.log('approve', data)
  return Promise.resolve({ status_code: 200 })
}
