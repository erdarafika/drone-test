
const tokens = {
  admin: {
    token: 'admin-token'
  },
  approver: {
    token: 'approver-token'
  }
}

/* CRUD PERMISSIONS
  0 : Approver,
  1 : Maker.
  2 : Checker


*/

const users = {
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTg2NjQ5MDYsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9NQUtFUiIsIlJPTEVfQVBQUk9WRVIiLCJTVVBFUlVTRVIiLCJST0xFX0NIRUNLRVIiXSwianRpIjoiODY2YTRlNzAtMTU4ZC00N2UyLTk5N2UtNzZjMTI0ZGMzZDBkIiwiY2xpZW50X2lkIjoicmF6b3IiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.FQgIYj67eHsbmCXHTZ4c62R7ZjlPED_lQ9UoF2_kGL8': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://imgbbb.com/images/2019/04/29/man-1.png',
    name: 'Super Admin',
    crudPermissions: ['maker','checkher'] 
  },
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTg2NjUwNTAsInVzZXJfbmFtZSI6InBlbnNpdW5rdSIsImF1dGhvcml0aWVzIjpbIlJPTEVfTUFLRVIiLCJST0xFX09QUyIsIlJPTEVfQVBQUk9WRVIiLCJST0xFX0NIRUNLRVIiXSwianRpIjoiOWY3MDdjZWUtNDY3ZS00MWRhLWJlM2EtMGM1YjZmYzc3MWI5IiwiY2xpZW50X2lkIjoicmF6b3IiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.ZTkKUjOAWn28MZ7-c88UT-W4nogfOMCcI4riELfxT1k': {
    roles: ['admin'],
    introduction: 'I am an approver',
    avatar: 'https://imgbbb.com/images/2019/04/29/man-1.png',
    name: 'Normal Approver',
    crudPermissions: ['approver']
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
