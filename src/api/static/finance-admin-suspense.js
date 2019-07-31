// import contribution from './data-store/contribution'

export function fetchList() {
  // const data = contribution.getData()
  const data = [{ dplkBank: 'Bank 1', amount: 100, outstanding: 0.0, created_at: new Date() }]
  return Promise.resolve(data || [])
}
