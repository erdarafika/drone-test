const authorities = [{
  'role': 'SUPERUSER',
  'authority': 'SUPERUSER'
}, {
  'role': 'ROLE_CHECKER',
  'authority': 'ROLE_CHECKER'
}, {
  'role': 'ROLE_MAKER',
  'authority': 'ROLE_MAKER'
}, {
  'role': 'ROLE_APPROVER',
  'authority': 'ROLE_APPROVER'
}]
const menus = [
  'dashboard',
  'address-type',
  'location',
  'bank',
  'department',
  'holiday',
  'document',
  'tolerance',
  'benefit-rule',
  'email',
  'fee-type',
  'benefit-type',
  'transaction-type',
  'dplk-configuration',
  'investment_type',
  'unit-price',
  'company',
  'group',
  'member',
  'billing-ppukp',
  'billing-ppip',
  'billing-ppip-individual',
  'topup-adhoc',
  'admin-suspense',
  'match-suspense',
  'refund',
  'user-maintenance',
  'fee-summary',
  'fee-list',
  'feature-founder',
  'batch-list',
  'report',
  'letter',
  'email-status',
  'fund-switching',
  'task-management',
  'fund_transfer',
  'benefit-pension-ppukp',
  'benefit-pension-ppip',
  'withdrawal']

export function fetchAuthorities() {
  return authorities.map(item => item.role.toLowerCase()) // FIXME: shound not use tolowercase
}

export function fetchMenus() {
  return menus
}
