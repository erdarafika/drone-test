import Mock from 'mockjs'

const item = Mock.mock({
  id: '@increment',
  'maxPerYear|1-99999': 100,
  'minAmmount|1-99999': 100,
  'minEffectiveYear|1-99999': 100,
  'normalRetiringAge|1-100':100,
  'differenceRetiringAge|1-100':100,
  'isActive|1-10': true,
  createdDate: '@date("yyyy-MM-dd")'
})

export default [
  {
    url: '/withdrawal-rule/detail',
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
    url: '/withdrawal-rule/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

