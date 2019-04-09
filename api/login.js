import request from '@/utils/request'

// 登录
export function login(username, password) {
  return request({
    url: '/api/login.json',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// 修改密码
export function modifyPassword(data) {
  return request({
    url: '/modifyPassword.json',
    method: 'post',
    data
  })
}

// 获取用户信息 现在没有这个接口
export function getInfo(token) {
  return request({
    url: '/api/user/info',
    method: 'get',
    params: { token }
  })
}

// 退出
export function logout(data) {
  return request({
    url: '/api/logout.json',
    method: 'post',
    data
  })
}
