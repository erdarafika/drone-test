import crudPermission from './crud-permission'

const install = function(Vue) {
  Vue.directive('crud-permission', crudPermission)
}

if (window.Vue) {
  window['crud-permission'] = crudPermission
  Vue.use(install); // eslint-disable-line
}

crudPermission.install = install
export default crudPermission
