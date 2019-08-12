
export function fetchList() {
  const data = [
    { money: 50000000, period: new Date() },
    { money: 75000000, period: new Date() },
    { money: 55000000, period: new Date() },
    { money: 55000000, period: new Date() },
    { money: 55000000, period: new Date() }]
  return Promise.resolve(data || [])
}
