import Mock from 'mockjs'

const item = Mock.mock({
  id: '@increment',
  name: '@title(3,5)',
  'dplkBankId|1-7': 100,
  'status|1-2': true,
  'accountCode|1-99999': 100,
  'isActive|1-10': true,
  createdDate: '@date("yyyy-MM-dd")'
})

export default [
  {
    url: '/virtual-account/detail',
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
    url: '/virtual-account/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

