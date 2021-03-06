import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import {store} from '@/store'
import { getToken } from '@/utils/auth'
console.log(store)

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  // timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {

    config.headers.token = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改

    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 1 && res.code !== '1') {
      // 123104 token 过期
      if (res.errorCode === 1) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/FedLogOut',true).then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
        return Promise.reject('error')
      }
      Message({
        message: res.msg || '未知异常,请联系程序员小哥哥~',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.errorDesc || '服务器开了个小差',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
