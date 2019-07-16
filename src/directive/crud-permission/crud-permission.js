import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const route = store.getters.route

    if (!route.meta.hasOwnProperty('pensionMenu')) {
      throw new Error(`pensionMenu Permission is not setup yet`)
    }
    const { value } = binding

    let crud_level = store.getters && store.getters.authorities
    crud_level = crud_level[route.meta.pensionMenu]

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
