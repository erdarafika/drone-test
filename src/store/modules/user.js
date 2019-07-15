import { loginOauth2, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: 'https://i.ibb.co/2P7FGtN/user.png',
  introduction: '',
  position: '',
  roles: [],
  authorities: [],
  // crud_level: [],
  menus: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  // SET_CRUD_LEVEL(state, crud_level) {
  //   state.crud_level = crud_level
  // },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_POSITION: (state, position) => {
    state.position = position
  },
  SET_AUTHORITIES: (state, authorities) => {
    state.authorities = authorities
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      loginOauth2({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        const token = `${data.token_type} ${data.access_token}`
        commit('SET_TOKEN', data.access_token)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const data = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        console.log(data)

        const roles = [data.role]
        // const roles = data.authorities.map(item => item.role)
        const name = data.dplkStaff.name
        const menus = data.authorities.map(item => item.menu)
        const position = data.dplkStaff.department.name
        const authorities = data.authorities

        // roles must be a non-empty array
        // if (!roles || roles.length <= 0) {
        //   reject('getInfo: roles must be a non-null array!')
        // }

        // commit('SET_CRUD_LEVEL', roles)
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_MENUS', menus)
        commit('SET_POSITION', position)
        commit('SET_AUTHORITIES', authorities)

        // commit('SET_AVATAR', avatar)
        // commit('SET_INTRODUCTION', introduction)
        resolve({ name, roles, menus })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // Dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
