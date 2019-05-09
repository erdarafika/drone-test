import Mock from 'mockjs'

const item = Mock.mock({
  id: '@increment',
  name: 'DPLK Indo Assurance',
  website: 'dplk.indo.id',
  email: 'dplk@gmail.com',
  'telpNumber|1-999999999999': 100,
  'fax|1-999999999999': 100,
})

export default [
  {
    url: '/dplk-information/detail',
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
    url: '/dplk-information/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

