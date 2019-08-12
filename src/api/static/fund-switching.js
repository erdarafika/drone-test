export function fetchList() {
  const data = [{ company: 'Company 1', group: 'Group 1', member: 'Member 1', status: 'active', created_at: new Date() }]
  return Promise.resolve(data || [])
}

export function createRecord(data) {
  console.log('create', data)
  return Promise.resolve({ status_code: 200 })
}
