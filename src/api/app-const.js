const authorities = [{ 'role': 'SUPERUSER', 'authority': 'SUPERUSER' }, { 'role': 'ROLE_CHECKER', 'authority': 'ROLE_CHECKER' }, { 'role': 'ROLE_MAKER', 'authority': 'ROLE_MAKER' }, { 'role': 'ROLE_APPROVER', 'authority': 'ROLE_APPROVER' }]
const menus = ['dashboard', 'investment type', 'company information', 'dplk information', 'dplk address', 'dplk bank account']

export function fetchAuthorities() {
  return authorities.map(item => item.role.toLowerCase()) // FIXME: shound not use tolowercase
}

export function fetchMenus() {
  return menus
}

