import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const crud_level = store.getters && store.getters.crud_level

    if (value && value instanceof Array && value.length > 0) {
      const permissionCrud = value

      const hasPermission = crud_level.some(level => {
        return permissionCrud.includes(level)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need level! Like v-crud-permission="[0,1]"`)
    }
  }
}
