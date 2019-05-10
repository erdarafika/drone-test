import Mock from 'mockjs'

const List = []
const count = 15
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'addressTypeId|0-99':100,
    'countryId|0-31':100,
    'cityId|0-399':100,
    'postalCode|1-99999':100,
    'isDefault': false,
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'

  }))
}

export default [
  {
    url: '/dplk-address/list',
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
    url: '/dplk-address/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/dplk-address/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

