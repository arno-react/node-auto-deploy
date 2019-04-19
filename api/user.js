import request from '@/utils/request'

export function permissList() {
  return request({
    url: '/api/permissList.json',
    method: 'post',
    data: {
    }
  })
}
export function userkList() {
  return request({
    url: '/api/userList.json',
    method: 'post',
    data: {
    }
  })
}
export function delUser(id) {
  return request({
    url: '/api/userDel.json',
    method: 'post',
    data: {
      id
    }
  })
}

export function addUser(data) {
  return request({
    url: '/api/userAdd.json',
    method: 'post',
    data:data
  })
}
export function updateUser(data) {
  return request({
    url: '/api/userUpdate.json',
    method: 'post',
    data:data
  })
}