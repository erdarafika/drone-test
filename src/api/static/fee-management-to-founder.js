
export function fetchList() {
  const data = [{ money: 31231232, period: new Date() }]
  return Promise.resolve(data || [])
}
