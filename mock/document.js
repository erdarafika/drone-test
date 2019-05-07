import Mock from 'mockjs'

const List = []
const ReasonList = []
const reasonCount = 4
const count = 8
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@title(5, 10)',
    code: '@word',
    description: '@title(2, 4)',
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'
  }))
}

for (let i = 0; i < reasonCount; i++) {
  ReasonList.push(Mock.mock({
    id: '@increment',
    reason: '@title(5, 10)',
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'
  }))
}

export default [
  {
    url: '/document/reason/list',
    type: 'get',
    response: config => {
      // const { q, page = 1, limit = 20 } = config.query
      const mockList = ReasonList
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
    url: '/document/reason/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/document/list',
    type: 'get',
    response: config => {
      const { q, page = 1, limit = 20 } = config.query

      const mockList = List.filter(item => {
        if (q && (!item.name.includes(q) && !item.code.includes(q) && !item.description.includes(q))) return false
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

