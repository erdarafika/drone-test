export function fetchList() {
  const data = [
    { company: 'PT Digital Kreatif Antara', group: 'PPUKP', member: 'Siti', status: 'active', created_at: new Date() },
    { company: 'PT Digital Kreatif Antara', group: 'PPUKP', member: 'Prapto', status: 'active', created_at: new Date() },
    { company: 'PT Digital Kreatif Antara', group: 'PPUKP', member: 'Beni', status: 'active', created_at: new Date() },
    { company: 'PT Digital Kreatif Antara', group: 'PPUKP', member: 'Lina', status: 'active', created_at: new Date() },
    { company: 'PT Code Coffee Creative', group: 'PPIP Organization', member: 'Budi', status: 'active', created_at: new Date() }]
  return Promise.resolve(data || [])
}

export function createRecord(data) {
  console.log('create', data)
  return Promise.resolve({ status_code: 200 })
}
