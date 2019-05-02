import Mock from 'mockjs'

const item = Mock.mock({
  id: '@increment',
  'amount|1-99999': 100
  // 'isActive|1-10': true,
  // createdDate: '@date("yyyy-MM-dd")'
})

export default [
  {
    url: '/tolerance/detail',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: {
          items: item
        }
      }
    }
  },

  {
    url: '/tolerance/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

