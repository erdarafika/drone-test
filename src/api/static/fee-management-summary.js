
export function fetchList() {
  const data = [{ type: 'Type 1', totalTransaction: 312312, totalFee: 32132, create_at: new Date() }]
  return Promise.resolve(data || [])
}
