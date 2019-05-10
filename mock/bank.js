import Mock from 'mockjs'
import faker from 'faker'

const List = []
const BranchList = []
const branchCount = 4
const count = 8
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@title(1, 3)',
    'swiftCode|1-99999': 100,
    'transferCode|1-99999': 100,
    codeName:'@word',
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'
  }))
}

for (let i = 0; i < branchCount; i++) {
  BranchList.push(Mock.mock({
    id: '@increment',
    name: '@title(1, 3)',
    address: faker.address.streetAddress(),
    'countryId|0-30': 100,
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'
  }))
}

export default [
  {
    url: '/bank/branch/list',
    type: 'get',
    response: config => {
      // const { q, page = 1, limit = 20 } = config.query
      const mockList = BranchList
      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: mockList
        }
      }
    }
  },
  {
    url: '/bank/branch/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/bank/list',
    type: 'get',
    response: config => {
      const { q, page = 1, limit = 20 } = config.query

      const mockList = List.filter(item => {
        if (q && (!item.name.includes(q))) return false
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
    url: '/bank/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const bank of List) {
        if (bank.id === +id) {
          return {
            code: 20000,
            data: bank
          }
        }
      }
    }
  },

  {
    url: '/bank/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/bank/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

