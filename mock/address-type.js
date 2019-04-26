import Mock from 'mockjs'

const List = []
const count = 100
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    type: '@title(5, 10)',
    'isMemberAddress|1-2': true,
    'isCompanyAddress|1-4': true,
    'isActive|1-10': true
  }))
}

export default [
  {
    url: '/address-type/list',
    type: 'get',
    response: config => {
      const { type, page = 1, limit = 20, sort } = config.query
      let { isMemberAddress, isCompanyAddress } = config.query
      isMemberAddress = isMemberAddress ? (isMemberAddress === 'true') : isMemberAddress
      isCompanyAddress = isCompanyAddress ? (isCompanyAddress === 'true') : isCompanyAddress

      let mockList = List.filter(item => {
        if (type && !item.type.includes(type)) return false
        if (isMemberAddress && item.isMemberAddress !== isMemberAddress) return false
        if (isCompanyAddress && item.isCompanyAddress !== isCompanyAddress) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/address-type/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const addressType of List) {
        if (addressType.id === +id) {
          return {
            code: 20000,
            data: addressType
          }
        }
      }
    }
  },

  {
    url: '/address-type/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/address-type/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/address-type/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

