import Mock from 'mockjs'
import faker from 'faker'

const countryList = []
const countryCount = 33
for (let i = 0; i < countryCount; i++) {
  countryList.push(Mock.mock({
    id: '@increment',
    name: faker.address.country(),
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'
  }))
}
const provinceList = []
const provinceCount = 33
for (let i = 0; i < provinceCount; i++) {
  provinceList.push(Mock.mock({
    id: '@increment',
    name: faker.address.state(),
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'
  }))
}
const cityList = []
const cityCount = 33
for (let i = 0; i < cityCount; i++) {
  cityList.push(Mock.mock({
    id: '@increment',
    name: faker.address.city(),
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'
  }))
}

export default [
  {
    url: '/country/list',
    type: 'get',
    response: config => {
      const { q, page = 1, limit = 20 } = config.query

      const mockList = countryList.filter(item => {
        if (q && (!item.name.includes(q) && !item.code.includes(q))) return false
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
    url: '/province/list',
    type: 'get',
    response: config => {
      const { q, page = 1, limit = 20 } = config.query

      const mockList = provinceList.filter(item => {
        if (q && (!item.name.includes(q) && !item.code.includes(q))) return false
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
    url: '/city/list',
    type: 'get',
    response: config => {
      const { q, page = 1, limit = 20 } = config.query

      const mockList = cityList.filter(item => {
        if (q && (!item.name.includes(q) && !item.code.includes(q))) return false
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
    url: '/country/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/province/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/city/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/country/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/province/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/city/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

