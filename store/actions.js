import * as types from './mutation-types'
import * as User from '../api/user'
import * as Task from '../api/task'

const actions = {
  // actions中的函数接受一个与store实例有相同属性和方法的context对像
  // 因此可以调用context中包含的state,getters以及mutations中定义的方法
  // userLogin(context){
  //   context.commit(types.LOGIN);
  // }
  // 使用es6的函数参数结构简化代码，可以直接将context.commit => commit使用
  // 在.vue文件中通过store.dispatch('userLogin') 即可触发状态改变了
  // 这里的data是因为提交mutations时需要获取从/api/login传回的user对象
  deployList({
    commit
  }, data) {
    commit(types.DEPLOYLIST, data);
  },
  taskList({commit}, data) {
    return Task.taskList().then ( data => {
      if (data.code === 1) {
        commit(types.TASKLIST, data.data);
      }
    })
  },
  userList({commit}, data) {
    return User.userkList().then ( data => {
      if (data.code === 1) {
        data.data = data.data.map(item => {
          item.content = JSON.parse(item.content || '[]')
          return item
        })
        commit(types.USERLIST, data.data);
      }
    })
  },
  permissList({commit}, data) {
    return User.permissList().then ( data => {
      if (data.code === 1) {
        data.data = data.data.map(item => {
          item.key = item.id
          item.label = item.title
          return item
        })
        commit(types.PERMISSLIST, data.data);
      }
    })
  }
}

export default actions