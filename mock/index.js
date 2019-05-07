import Mock from 'mockjs'
import { param2Obj } from '../src/utils'

import user from './user'
import role from './role'
import search from './remote-search'
import addressType from './address-type'
import businessLine from './business-line'
import document from './document'
import holiday from './holiday'
import location from './location'
import tolerance from './tolerance'
import emailConfig from './email-config'
import feeType from './fee-type'
import productType from './product-type'
import bank from './bank'
import dplkBank from './dplk-bank'
import benefitType from './benefit-type'
import virtualAccount from './virtual-account'
import withdrawalRule from './withdrawal-rule'
import documentMatrix from  './document-matrix'

const mocks = [
  ...user,
  ...role,
  ...search,
  ...addressType,
  ...businessLine,
  ...document,
  ...holiday,
  ...location,
  ...tolerance,
  ...emailConfig,
  ...feeType,
  ...productType,
  ...bank,
  ...dplkBank,
  ...benefitType,
  ...virtualAccount,
  ...withdrawalRule,
  ...documentMatrix
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
export function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

// for mock server
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`/mock${url}`),
    type: type || 'get',
    response(req, res) {
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

export default mocks.map(route => {
  return responseFake(route.url, route.type, route.response)
})
