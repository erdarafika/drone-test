import Mock from 'mockjs'

const status = ['VERIFIED','UNVERIFIED','REJECTED']

const List = []
const count = 300

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'investmentTypeId|0-6': 100,
    effectiveDate: '@date("yyyy-MM-dd")',
    status: status[Math.floor(Math.random() * status.length)],
    'price|100-20000': 100,
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'
  }))
}

export default [
  {
    url: '/unit-price/list',
    type: 'get',
    response: config => {
      const { q, date, investmentTypeId, page = 1, limit = 20 } = config.query
      
      
      
      let mockList = List.filter(item => {
        if (q && (!`${item.price}`.includes(q) && !item.status.toLowerCase().includes(q.toLowerCase()))) return false
        if(date && item.effectiveDate!=date) return false
        if(investmentTypeId && item.investmentTypeId!=investmentTypeId) return false
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

//   {
//     url: '/unit-price/detail',
//     type: 'get',
//     response: config => {
//       const { id } = config.query
//       for (const unitPrice of List) {
//         if (unitPrice.id === +id) {
//           return {
//             code: 20000,
//             data: unitPrice
//           }
//         }
//       }
//     }
//   },

  {
    url: '/unit-price/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

//   {
//     url: '/unit-price/update',
//     type: 'post',
//     response: _ => {
//       return {
//         code: 20000,
//         data: 'success'
//       }
//     }
//   }
]

