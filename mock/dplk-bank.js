import Mock from 'mockjs'

const List = []
const count = 7
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    accountName: '@title(5, 10)',
    'accountNumber|1-999999999999': 100,
    'bankId|1-8': 100,
    'bankBranchId|1-8': 100,
    'countryId|1-32': 100,
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'

  }))
}

export default [
  {
    url: '/dplk-bank/list',
    type: 'get',
    response: config => {
      const { q, page = 1, limit = 20 } = config.query

      const mockList = List.filter(item => {
        if (q && (!item.accountName.toLowerCase().includes(q.toLowerCase()) && !`${item.accountNumber}`.includes(q))) return false
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
    url: '/dplk-bank/detail',
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
    url: '/dplk-bank/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/dplk-bank/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

