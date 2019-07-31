export function fetchList() {
  const data = [{ id: 1, name: 'Company Bank 1' }, { id: 2, name: 'Company Bank 2' }]
  return Promise.resolve(data || [])
}
