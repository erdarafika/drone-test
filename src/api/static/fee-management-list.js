
export function fetchList() {
  const data = [{ transactionDate: new Date(), description: 'description', moneySource: 'source 1' }]
  return Promise.resolve(data || [])
}
