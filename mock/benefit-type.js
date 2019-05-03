import Mock from 'mockjs'

const BenefitList = []
const SubBenefitList = []
const SubBenefitDocumentList = []

const count = 8
for (let i = 0; i < count; i++) {
  BenefitList.push(Mock.mock({
    id: '@increment',
    type: '@word',
    name: '@title(3, 5)',
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'
  }))

  SubBenefitList.push(Mock.mock({
    id: '@increment',
    code: '@word',
    'benefitTypeId|1-8': 100,
    name: '@title(5, 10)',
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'
  }))

  SubBenefitDocumentList.push(Mock.mock({
    id: '@increment',
    'documentId|1-8': 100,
    'subBenefitTypeId|1-8': 100,
    'required|1-10': true,
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'
  }))
}

export default [
  {
    url: '/benefit-type/list',
    type: 'get',
    response: config => {
      const { q, page = 1, limit = 20 } = config.query

      const mockList = BenefitList.filter(item => {
        if (q && (!q.type.toLowerCase().includes(q.toLowerCase()) && !q.name.toLowerCase().includes(q.toLowerCase()))) return false
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
    url: '/benefit-type/sub-benefit/list',
    type: 'get',
    response: config => {
      const { q, page = 1, limit = 20 } = config.query

      const mockList = SubBenefitList.filter(item => {
        if (q && (!q.code.toLowerCase().includes(q.toLowerCase()) && !q.name.toLowerCase().includes(q.toLowerCase()))) return false
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
    url: '/benefit-type/sub-benefit/document/list',
    type: 'get',
    response: config => {
      const { q, page = 1, limit = 20 } = config.query

      const mockList = SubBenefitDocumentList.filter(item => {
        if (q && (!q.code.toLowerCase().includes(q.toLowerCase()) && !q.name.toLowerCase().includes(q.toLowerCase()))) return false
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
    url: '/benefit-type/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

