import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import crudPermission from '@/directive/crud-permission/index.js'
import * as filters from './filters' // global filters

import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import VueTheMask from 'vue-the-mask'

import confirmDelete from './global-function/deleteConfirm'
import { successNotifier, cancelNotifier } from './global-function/defaultMessage'
import { IDR } from './global-function/amountFormatter'
import Delete from './components/ActionButtons/Delete'
import Cancel from './components/ActionButtons/Cancel'
import Upload from './components/ActionButtons/Upload'
import Edit from './components/ActionButtons/Edit'
import Detail from './components/ActionButtons/Detail'
import Reject from './components/ActionButtons/Reject'
import Approve from './components/ActionButtons/Approve'
import Back from './components/ActionButtons/Back'
import RequestApproval from './components/ActionButtons/RequestApproval'
import Authorization from './components/ActionButtons/Authorization'
import Terminate from './components/ActionButtons/Terminate'
import SettingPassword from './components/ActionButtons/SettingPassword'
import Status from './components/ActionButtons/Status'
import VCalendar from 'v-calendar'
import AppContainer from './components/AppContainer/'
//  Register Component
Vue.component('Delete', Delete)
Vue.component('Cancel', Cancel)
Vue.component('Upload', Upload)
Vue.component('Edit', Edit)
Vue.component('Detail', Detail)
Vue.component('Approve', Approve)
Vue.component('Reject', Reject)
Vue.component('Back', Back)
Vue.component('RequestApproval', RequestApproval)
Vue.component('Authorization', Authorization)
Vue.component('Terminate', Terminate)
Vue.component('SettingPassword', SettingPassword)
Vue.component('Status', Status)
Vue.component('AppContainer', AppContainer)

Vue.use(crudPermission)
const moment = require('moment')
require('moment/locale/id')
require('twix')
import money from 'v-money'

Vue.use(money, { precision: 0 })
Vue.use(require('vue-moment'), {
  moment
})
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.mixin({
  methods: {
    confirmDelete,
    successNotifier,
    cancelNotifier,
    IDR
  }
})
Vue.use(VueTheMask)
Vue.use(VCalendar)

Vue.filter('capitalize', function(value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('striped-to-titlecase', function(value) {
  if (!value) return ''
  value = value.toString()
  value = value.split('-')
  const final = []
  for (const word of value) {
    final.push(word.charAt(0).toUpperCase() + word.slice(1))
  }
  return final.join(' ')
})

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://8f15532b03aa48edb161edc5627984ad@sentry.io/1480169',
    integrations: [new Integrations.Vue({ Vue, attachProps: true })]
  })
}

Vue.prototype.$eventBus = new Vue()
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
