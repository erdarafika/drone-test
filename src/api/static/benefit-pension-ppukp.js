export function fetchList() {
  const data = [{
    code: 'code 1',
    groupSource: 'Group 1',
    member: 'Member 1',
    groupDestination: 'New Company 1',
    subBenefitType: 'Sub Benefit Type 1',
    type: 'Type 1',
    withdrawalNow: 'Withdrawal 1',
    withdrawalAmount: 312312,
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
