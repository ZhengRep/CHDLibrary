const WXAPI = require('../api/index')
const utils = require('./util')
const app = getApp()
// 检测登录状态，返回 true / false
async function checkHasLogined() {
  const token = wx.getStorageSync('token')
  if (!token) {
    return false
  }
  wx.checkSession({
    fail() {
      return false
    }
  })
  // 若要启用token 则需要在此进行token有效性验证，在无安全性要求前提下，不需要
  const checkTokenRes = await checkToken(token)
  console.log("[page:auth checkToken]result token:",checkTokenRes)
  if (checkTokenRes.code != 1) {
    wx.removeStorageSync('token')
    return false
  }
  return true
}

async function checkToken(token){
  return await WXAPI.checkToken(token).then(res => {
    //console.log('[page:auth checkToken]checkToken 成功:', res)
    return res
  }).catch(err => {
    console.log('[page:auth checkToken]checkToken 失败:', err)
    return err
  })
}

async function login() {
  const that = this
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        WXAPI.login(res.code).then(res => {
          // console.log('login',res.data);
          resolve(res.data) 
        }).catch(err => {
          reject(err)
        })
      }
    })
  })
}

async function init(){
  const token = wx.getStorageSync('token')
  if (!token) {
    return false
  }
  return await WXAPI.init(token)
}

/**
 * 登录系统流程
 */
async function loginSys(token){
  const that = this
  if (token) {
    return true
  } else {
    // 检查是否登录过（是否有token）
    let check = await checkHasLogined()
    if (check === false) {
      // 没有token 执行这里,获得token
      let res = await login().catch(err => {
        console.error('[page:auth login]微信登录错误',err)
        wx.showModal({
          title: '网络错误，请稍后再试',
          showCancel: false
        })
        return false
      })
      await wx.setStorageSync('token', res.token)
    }

    // 存在token，获取信息
    let result = await init().then(res => {
      // 执行相关登录方法即可
      let data = JSON.parse(utils.base64.decode(res.data))
      //console.log('userData:',data)
      wx.setStorageSync('is_bind', data.is_bind)
      wx.setStorageSync('_user', data.user)
      wx.setStorageSync('_time', data.time)
      
      return data
    }).catch(err => {
      console.log('[page:auth init] 登录错误', err)
      if (err.msg === 'info missed') {
        // 已经登录，但是数据库里登录信息被删了，需要再次登录
        return login().then(res => {
          wx.setStorageSync('token', res.token)
        }).catch(err => {
          console.log('[page:auth init]再次登录失败', err)
        })
      } else {
        console.log('[page:auth init]其他登录问题', err)
        //that.showErrorModal(err.msg)
        return false
      }
    })
    //console.log('[page:auth loginSys]',result)
    return result
  }
}

module.exports = {
  checkHasLogined: checkHasLogined,
  login: login,
  init: init,
  loginSys: loginSys
}