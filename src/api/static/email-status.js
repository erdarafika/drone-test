
export function fetchList() {
  const data = [{ type: 'Type 1', email: 'budi@gmail.com', status: 'active' }]
  return Promise.resolve(data || [])
}
