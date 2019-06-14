const authorities = [{ 'role': 'SUPERUSER', 'authority': 'SUPERUSER' }, { 'role': 'ROLE_CHECKER', 'authority': 'ROLE_CHECKER' }, { 'role': 'ROLE_MAKER', 'authority': 'ROLE_MAKER' }, { 'role': 'ROLE_APPROVER', 'authority': 'ROLE_APPROVER' }]
const menus = ['dashboard', 'investment type']

export function fetchAuthorities() {
  return authorities.map(item => item.role)
}

export function fetchMenus() {
  return menus
}

