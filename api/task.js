import request from '@/utils/request'

// 任务例表
export function taskList() {
  return request({
    url: '/api/taskList.json',
    method: 'post',
    data: {
    }
  })
}


export function delTask(id) {
  return request({
    url: '/api/delTask.json',
    method: 'post',
    data: {
      id
    }
  })
}
export function taskDetail(id) {
  return request({
    url: '/api/taskDetail.json',
    method: 'post',
    data: {
      id
    }
  })
}

export function startTask(id) {
  return request({
    url: '/api/startTask.json',
    method: 'post',
    data: {
      id
    }
  })
}
export function stopTask(id) {
  return request({
    url: '/api/stopTask.json',
    method: 'post',
    data: {
      id
    }
  })
}
export function checkGitInfo(data) {
  return request({
    url: '/api/checkGitInfo.json',
    method: 'post',
    data: data
  })
}
export function addTask(data) {
  return request({
    url: '/api/addTask.json',
    method: 'post',
    data: data
  })
}

export function performTaskList(pid) {
  return request({
    url: '/api/performTaskList.json',
    method: 'post',
    data: {
      pid
    }
  })
}
export function performTaskDetail(id) {
  return request({
    url: '/api/performTaskDetail.json',
    method: 'post',
    data: {
      id
    }
  })
}