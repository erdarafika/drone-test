import Mock from 'mockjs'

const List = []
const count = 4
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name:'@word',
    'nip|1-999999999':100,
    email:'@word',
    'roleId':0,
    'isDefault': false,
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'

  }))
}

export default [
  {
    url: '/dplk-staff/list',
    type: 'get',
    response: config => {
      const {q, page = 1, limit = 20, sort } = config.query

      const mockList = List.filter(item => {
        if (q && (!item.name.toLowerCase().includes(q.toLowerCase()) && !item.email.toLowerCase().includes(q.toLowerCase()) && !`${item.nip}`.includes(q))) return false
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
    url: '/dplk-staff/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/dplk-staff/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

