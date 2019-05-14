
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
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://imgbbb.com/images/2019/04/29/man-1.png',
    name: 'Super Admin',
    crudPermissions: ['maker','checkher'] 
  },
  'approver-token': {
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
