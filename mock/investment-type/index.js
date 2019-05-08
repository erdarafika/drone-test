import Mock from 'mockjs'

const status = ['VERIFIED','UNVERIFIED','REJECTED']

const List = []
const count = 7

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    fundName: '@title(1,3)',
    code: '@word',
    status: status[Math.floor(Math.random() * status.length)],
    description: '@title(1,5)',
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'
  }))
}

export default [
  {
    url: '/investment-type/list',
    type: 'get',
    response: config => {
      const { q, page = 1, limit = 20 } = config.query

      const mockList = List.filter(item => {
        if (q && (!item.fundName.toLowerCase().includes(q.toLowerCase()) && !item.code.toLowerCase().includes(q.toLowerCase()))) return false
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
    url: '/investment-type/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const investmentType of List) {
        if (investmentType.id === +id) {
          return {
            code: 20000,
            data: investmentType
          }
        }
      }
    }
  },

  {
    url: '/investment-type/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/investment-type/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

