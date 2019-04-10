import Vue from 'vue'
import io from 'socket.io-client'

import {store} from '@/store'

var socket = io(`ws://${location.host}`);

socket.on('connect', function(){

});
socket.on('disconnect', function(){

});
socket.on('deployList',async function (data) {
  console.log(data)
  store.dispatch('deployList',data)
})
var socketF = {
  self:socket,
  newUser(data){
    socket.emit('newUser', data)
  },
  add(data){
    socket.emit('add', data)
  },
  getInfo(data){
    socket.emit('getInfo', data)
  },
  getAllUser(){
    socket.emit('getAllUser', store.state.user)
  },
  getDelUser(){
    socket.emit('getDelUser', store.state.user)
  }

}
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * CrossDomainStorage init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.socket) {
      this.$socket = typeof options.socket === 'function'
        ? options.socket()
        : options.socket;
    } else if (options.parent && options.parent.$socket) {
      this.$socket = options.parent.$socket;
    }
  }
};
const S= {
  install: function (Vue,options) { //核心部分，在我们使用Vue.use()时，自动调用的是install，而install导出的必须是的组件
    applyMixin(Vue)
  },
  socket: socketF
}
export default () => {
  Vue.use(S)
}