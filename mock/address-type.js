import Mock from 'mockjs'

const List = []
const count = 100
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    type: '@title(5, 10)',
    'isMemberAddress|1-2': true,
    'isCompanyAddress|1-4': true,
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'

  }))
}

export default [
  {
    url: '/address-type/list',
    type: 'get',
    response: config => {
      const { type, page = 1, limit = 20 } = config.query

      const mockList = List.filter(item => {
        if (type && !item.type.toLowerCase().includes(type.toLowerCase())) return false
        return true
      })

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

