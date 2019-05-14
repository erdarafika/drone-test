import store from '@/store'

export default function checkCrudPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const crud_level = store.getters && store.getters.crud_level
    const permissionCrud = value

    const hasPermission = crud_level.some(level => {
      return permissionCrud.includes(level)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.log(`need level! Like v-crud-permission="[0,1]"`)
  }
}
