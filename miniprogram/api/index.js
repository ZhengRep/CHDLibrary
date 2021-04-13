//封装网络请求
const CONFIG = require('../config.js')
const utils = require('../utils/util.js')
const request = (url, method, data) => {
  const system = wx.getSystemInfoSync()
  const _url = system.brand !== 'devtools' ? CONFIG.api_build : CONFIG.api_dev[CONFIG.env]
  // const _url = CONFIG.api_dev[CONFIG.env]
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url + url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if (res.statusCode !== 200) {
          reject({
            msg: '请求失败',
            statusCode: res.statusCode
          })
        }
        // 小程序项目中 返回值code为1 才为正确
        if (res.data.code === 1) {
          resolve(res.data)
        } else {
          reject({
            msg: res.data.msg || '数据错误',
            statusCode: res.statusCode
          })
        }
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

/**
 * API
 * 约定: 请求参数均使用POST传递， 参数只有token或code的时候，不用加密，有其他参数时，必须使用key加密
 */
 module.exports = {
    request,
    init: (token) => {
      return request('/wxuser/init_token', 'post', {
        token: token
      })
    },
    checkToken: (token) => {
      return request('/wxuser/check_token', 'post', {
        token
      })
    },
    login: (code) => {
      return request('/wxuser/login', 'post', {
        code: code
      })
    },
    // 绑定门户账号
    bind: (token, stuid, passwd) => {
      let formData = {
        token: token,
        stuid: stuid,
        passwd: passwd
      }
      return request('/wxuser/bind', 'post', utils.key(formData))
    },
    // 获取首页banner 
    getIndexBanner: () => {
      return request('/index/banner_list', 'get')
    },
    // 获取首页app
    getIndexApp: (token) => {
      return request('/index/app_list', 'post', {
        token: token
      })
    },
    }