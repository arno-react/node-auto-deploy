import Vue from 'vue'
import {store} from '@/store'
Vue.directive('permiss', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, obj) {
    // 聚焦元素
    var value = obj.value
    var permissList = store.state.permissList || []
    var userInfo = store.state.user.userInfo.content || []
    console.log(value)
    console.log(permissList)
    console.log(userInfo)
    let id = ''
    permissList.forEach(item => {
      if (item.api === value){
        id = item.id
      }
    })
    if(id) {
      if (userInfo.indexOf(id) === -1){
        el.style = 'display:none;'
      }
    }

  }
})