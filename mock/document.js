import Mock from 'mockjs'

const List = []
const count = 100
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@title(5, 10)',
    code: '@word',
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'

  }))
}

export default [
  {
    url: '/document/list',
    type: 'get',
    response: config => {
      const { q, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (q && (!item.name.includes(q) && !item.code.includes(q))) return false
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
    url: '/document/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const document of List) {
        if (document.id === +id) {
          return {
            code: 20000,
            data: document
          }
        }
      }
    }
  },

  {
    url: '/document/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/document/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

