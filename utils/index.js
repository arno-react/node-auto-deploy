
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 随便写的一个ajax请求，目前只做了get 的方法的处理
 * @param {object} params                 传给后台的参数
 * @param {object} params.headers         设置请求头
 * @param {object} params.data            给后台的参数
 * @param {object} params.contentType     设置请求类型
 * @param {object} params.fileType        设置显示类型 excel 还是pdf 等
 */
export function blobAjax(params = {}) {
  const ajaxType = params.type || 'GET'
  const ajaxUrl = params.url || ''
  const ajaxData = params.data || {}
  const contentType = params.contentType || 'string'
  const ajaxHeader = {
    'Content-Type': 'application/x-www-form-urlencoded',
    token: localStorage.token || '',
    ...params.headers
  }
  console.log(ajaxHeader)
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    if (!xhr) {
      alert('不支持低版本的IE浏览器，推荐您使用谷歌浏览器查看哦亲~')
      return
    }
    // 处理请求参数
    let urlString = ''
    for (const value in ajaxData) {
      urlString += '&' + value + '=' + ajaxData[value]
    }

    if (ajaxType.toUpperCase() === 'GET') {
      const url = urlString.length ? ajaxUrl + '?' + urlString.substring(1) : ajaxUrl
      xhr.open(ajaxType, url, true)
    } else {
      xhr.open(ajaxType, ajaxUrl, true)
    }

    xhr.timeout = 6000
    // xhr.ontimeout = function(event) {
    //     alert('请求超时！')
    // }
    for (const item in ajaxHeader) {
      console.log(String(item))
      xhr.setRequestHeader([String(item)], ajaxHeader[item])
    }

    if (ajaxType.toUpperCase() === 'GET') {
      xhr.send(null)
    } else {
      switch (contentType) {
        case 'json':
          xhr.send(JSON.stringify(ajaxData))
          break
        default:
          xhr.send(urlString)
      }
    }

    xhr.responseType = 'blob'
    // 返回类型blob
    // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
    xhr.onreadystatechange = function(err) {
      if (xhr.readyState === 4) {
        const status = xhr.status
        // status：响应的HTTP状态码，以2开头的都是成功
        if (status >= 200 && status < 300) {
          // 成功回调函数
          console.log(xhr.response)
          console.log(xhr.response.type)
          resolve(xhr.response)
        } else {
          reject(err, status)
        }
      }
    }
  })
  return promise
}
