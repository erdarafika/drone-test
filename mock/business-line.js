import Mock from 'mockjs'

const List = []
const count = 11
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@title(5, 10)',
    'code|1-99999': 100,
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'

  }))
}

export default [
  {
    url: '/business-line/list',
    type: 'get',
    response: config => {
      const { q, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (q && (!item.name.toLowerCase().includes(q.toLowerCase()) && !`${item.code}`.includes(q))) return false
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
    url: '/business-line/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const businessLine of List) {
        if (businessLine.id === +id) {
          return {
            code: 20000,
            data: businessLine
          }
        }
      }
    }
  },

  {
    url: '/business-line/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/business-line/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

