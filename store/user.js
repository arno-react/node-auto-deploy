import {login, logout} from '@/api/login'
import {getToken, setToken, removeToken, getLogin, setLogin} from '@/utils/auth'
import {Message} from 'element-ui'
// Tip Vuex 的状态存储是响应式的,所以最好记得初始化，不然容易gg
export const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: [],
  userInfo: null,
  menuList: [],
  goLogin: getLogin()
}

export const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_MENULIST: (state, menuList) => {
    state.menuList = menuList
  },
  SET_GOLOGIN: (state, menuList) => {
    state.goLogin = menuList
  }
}

export const actions = {
  // 登录
  Login({commit}, userInfo) {
    const username = userInfo.username.trim()
    return new Promise((resolve, reject) => {
      login(username, userInfo.password).then(resp => {
        if (resp.code === 1){
          const token = resp.data.user.token
          const permissionList = resp.data.buttonResMap || {}
          const menuResList = resp.data.menuResList
          // if (Object.keys(permissionList).length === 0) {
          //   Message({
          //     message: '没有分配权限, 请联系管理员',
          //     type: 'error'
          //   })
          //   return
          // }
          // 去除修改密码的菜单
          // menuResList.forEach(function(v, i) {
          //   if (v.alias === 'external') {
          //     menuResList.splice(i, 1)
          //   }
          // })
          // 存储数据
          localStorage.token = resp.data.user.token
          sessionStorage.setItem('user', JSON.stringify(resp.data.user))
          sessionStorage.setItem('menuList', JSON.stringify(menuResList))

          // sessionStorage.menuList = JSON.stringify(menuResList)

          // 后台返回的所有权限列表， 直接存到缓存，为了指令中取到当前页面的权限列表
          sessionStorage.setItem('_juxin_buttonResMap_response_', JSON.stringify(permissionList))
          commit('SET_TOKEN', token)
          commit('SET_USERINFO', resp.data.user)
          commit('SET_NAME', resp.data.user.uname)
          commit('SET_MENULIST', menuResList)
          setToken(token)
          Message({
            message: '登录成功',
            type: 'success'
          })
          resolve()
        } else{
          reject(resp)
        }


      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  GetInfo({commit, state}) {
    commit('SET_USERINFO', sessionStorage.user ? JSON.parse(sessionStorage.user) : {})
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const data = response.data
    //     if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //       commit('SET_ROLES', data.roles)
    //     } else {
    //       reject('getInfo: roles must be a non-null array !')
    //     }
    //     commit('SET_NAME', data.name)
    //     commit('SET_AVATAR', data.avatar)
    //     resolve(response)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // 登出
  Loginout({commit, state}) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 前端 登出
  FedLogOut({commit},data) {
    return new Promise(resolve => {
      commit('SET_GOLOGIN', data)
      commit('SET_TOKEN', '')
      setLogin(data)
      removeToken()
      resolve()
    })
  }
}

