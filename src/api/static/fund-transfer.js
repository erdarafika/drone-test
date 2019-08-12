export function fetchList() {
  const data = [
    { company: 'PT Digital Kreatif Antara', group: 'Group 1', member: 'Member 1', newCompany: 'New Company 1', status: 'active', created_at: new Date() },
    { company: 'PT Code Coffee Creative', group: 'Group 1', member: 'Member 1', newCompany: 'New Company 1', status: 'active', created_at: new Date() },
    { company: 'PT Digital Kreatif Antara', group: 'Group 1', member: 'Member 1', newCompany: 'New Company 1', status: 'active', created_at: new Date() },
    { company: 'PT Digital Kreatif Antara', group: 'Group 1', member: 'Member 1', newCompany: 'New Company 1', status: 'active', created_at: new Date() },
    { company: 'PT Modal Antara', group: 'Group 1', member: 'Member 1', newCompany: 'New Company 1', status: 'active', created_at: new Date() }
  ]
  return Promise.resolve(data || [])
}

export function createRecord(data) {
  console.log('create', data)
  return Promise.resolve({ status_code: 200 })
}
