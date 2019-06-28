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

import * as filters from './filters' // global filters

import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import confirmDelete from './global-function/deleteConfirm'
import Delete from './components/ActionButtons/Delete'
import Edit from './components/ActionButtons/Edit'
import Detail from './components/ActionButtons/Detail'

//  Register Component
Vue.component('Delete', Delete)
Vue.component('Edit', Edit)
Vue.component('Detail', Detail)

const moment = require('moment')
require('moment/locale/id')

import money from 'v-money'
// register directive v-money and component <money>
Vue.use(money, { precision: 0 })
/**
 * If you don't want to use mock-server
 * you want to use mockjs for request interception
 * you can execute:
 *
 * import { mockXHR } from '../mock'
 * mockXHR()
 */

Vue.use(require('vue-moment'), {
  moment
})

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.mixin({
  methods: {
    confirmDelete
  }
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
