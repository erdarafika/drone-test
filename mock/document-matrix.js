import Mock from 'mockjs'

const DtransactionType = [
    'Register Company',
    'Register Group',
    'Register Member PPUKP',
    'Register Member PPIP Organisasi',
    'Register Member PPIP Individu'
]

const Dtype = [
    'Additional',
    'Mandatory'
]


const List = []
const count = 7
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    transactionType: DtransactionType[Math.floor(Math.random() * DtransactionType.length)],
    type: Dtype[Math.floor(Math.random() * Dtype.length)],
    'documentId|1-7': 100,
    createdDate: '@date("yyyy-MM-dd")'

  }))
}

export default [
  {
    url: '/document-matrix/list',
    type: 'get',
    response: config => {
      const { q, page = 1, limit = 20 } = config.query

      const mockList = List.filter(item => {
        if (q && (!item.transactionType.toLowerCase().includes(q.toLowerCase()) && !item.type.toLowerCase().includes(q))) return false
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
    url: '/document-matrix/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/document-matrix/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

