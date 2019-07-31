export function fetchList() {
  return Promise.resolve([{ name: 'Member 1', id: 1, status: 'active' }, { name: 'Member 2', id: 2, status: 'active' }])
}
