import Mock from 'mockjs'

const List = []
const count = 15
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    holidayDate: '@date("yyyy-MM-dd")',
    description: '@title(5, 10)',
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'

  }))
}

export default [
  {
    url: '/holiday/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        // if (q && (!item.name.includes(q) && !item.code.includes(q))) return false
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

  // {
  //   url: '/holiday/detail',
  //   type: 'get',
  //   response: config => {
  //     const { id } = config.query
  //     for (const holiday of List) {
  //       if (holiday.id === +id) {
  //         return {
  //           code: 20000,
  //           data: holiday
  //         }
  //       }
  //     }
  //   }
  // },

  {
    url: '/holiday/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/holiday/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

