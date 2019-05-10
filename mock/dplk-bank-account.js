import Mock from 'mockjs'

const List = []
const count = 15
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name:'@word',
    'number|1-99999999999999':100,
    'bankId|0-7':100,
    'bankBranchId|0-3':100,
    createdDate: '@date("yyyy-MM-dd")'
  }))
}

export default [
  {
    url: '/dplk-bank-account/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20, sort } = config.query

      const mockList = List
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
    url: '/dplk-bank-account/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/dplk-bank-account/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

