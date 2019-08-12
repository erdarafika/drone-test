export function fetchList() {
  const data = [{
    member: 'Member 1',
    subBenefitType: 'Sub Benefit Type 1',
    submitDate: new Date(),
    status: 'active',
    created_at: new Date()
  }]
  return Promise.resolve(data || [])
}

export function createRecord(data) {
  console.log('create', data)
  return Promise.resolve({
    status_code: 200
  })
}
