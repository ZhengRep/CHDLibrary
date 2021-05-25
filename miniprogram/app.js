const config = require('./config')
const promisify = require('./utils/promisify')
const AUTH = require('./utils/auth')
const utils = require('./utils/util')
const themeListeners = []
global.isDemo = true
App({
  
  onLaunch(opts, data) {
    const that = this;

    //低版本兼容处理
    const canIUseSetBackgroundFetchToken = wx.canIUse('setBackgroundFetchToken')
    if (canIUseSetBackgroundFetchToken) {
      wx.setBackgroundFetchToken({
        token: 'getBackgroundFetchToken',
      })
    }
    if (wx.getBackgroundFetchData) {
      wx.getBackgroundFetchData({
        fetchType: 'pre',
        success(res) {
          that.globalData.backgroundFetchData  = res;
          console.log('读取预拉取数据成功')
        },
        fail() {
          console.log('读取预拉取数据失败')
        },
        complete() {
          console.log('结束读取')
        }
      })
    }
    console.log('App Launch', opts)
    if (data && data.path) {
      wx.navigateTo({
        url: data.path,
      })
    }
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: config.envId,
        traceUser: true,
      })
    }

    // 检测新版本
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    //判断是否有用户信息
    if(!that.globalData.hasUserInfo){
      wx.getStorage({
        key: 'userInfo',
        success (res) {
          console.log(res.data.nickName);
          that.globalData.nickName=res.data.nickName
          that.globalData.avatarUrl=res.data.avatarUrl
          that.globalData.hasUserInfo=true
        }
      })
      
    }

   //获取用户信息

    /**
     * 初次加载判断网络情况
     * 无网络状态下根据实际情况进行调整
     */
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === 'none') {
          that.globalData.isConnected = false
          wx.showToast({
            title: '当前无网络',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })

    /**
     * 监听网络状态变化
     * 可根据业务需求进行调整
     */
    wx.onNetworkStatusChange(function(res) {
      if (!res.isConnected) {
        that.globalData.isConnected = false
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000,
          complete: function() {
            that.goStartIndexPage()
          }
        })
      } else {
        that.globalData.isConnected = true
        wx.hideToast()
      }
    })

    // 获取设备信息
    wx.getSystemInfo({
      success: e => {
        let isiOS = e.system.indexOf('iOS') > -1
        let custom
        try {
          custom = wx.getMenuButtonBoundingClientRect() ? wx.getMenuButtonBoundingClientRect() : null
          if (!custom) {
            throw new Error('getMenuButtonBoundingClientRect error')
          }
          if (isiOS) {
            that.globalData.StatusBar = e.statusBarHeight + 4
          } else {
            that.globalData.StatusBar = e.statusBarHeight + 6
          }
          that.globalData.Custom = custom
          that.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight
        } catch (e) {
          that.globalData.StatusBar = 24
          that.globalData.CustomBar = 64
        }
      }
    })
    console.log('onlounch finised');
  },

  
  onShow(opts) {
    this.globalData.launchOption = opts
  },
  onHide() {
    console.log('App Hide')
  },
  onThemeChange({ theme }) {
    this.globalData.theme = theme
    themeListeners.forEach((listener) => {
        listener(theme)
    })
  },
  watchThemeChange(listener) {
      if (themeListeners.indexOf(listener) < 0) {
          themeListeners.push(listener)
      }
  },
  unWatchThemeChange(listener) {
      const index = themeListeners.indexOf(listener)
      if (index > -1) {
          themeListeners.splice(index, 1)
      }
  },


  async loginFunc(token) {
    let res = await AUTH.loginSys(token)
    if(!res){
      res = await AUTH.init()
    }
    this.globalData.is_bind = wx.getStorageSync('is_bind')
    this.globalData.token = wx.getStorageSync('token')
    return res
  },

  globalData: {
    theme: wx.getSystemInfoSync().theme,
    hasLogin: false,
    openid: null,
    iconTabbar: '/images/index/',
    isConnected: true,
    launchOption: undefined,
    is_bind: false,
    token: false,
    hasUserInfo:false,
    nickName:'',
    avatarUrl:'',
    // phoneNum:null,
    // hasPhoneNum:false
  },
  util: utils,


  // lazy loading openid
  getUserOpenId(callback) {
    const self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success(data) {
          wx.cloud.callFunction({
            name: 'login',
            data: {
              action: 'openid'
            },
            success: res => {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.result.openid
              callback(null, self.globalData.openid)
            },
            fail: err => {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail(err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  },
  // 通过云函数获取用户 openid，支持回调或 Promise
  getUserOpenIdViaCloud() {
    return wx.cloud.callFunction({
      name: 'WxContext',
      data: {}
    }).then(res => {
      this.globalData.openid = res.result.openid
      return res.result.openid
    })
  },

  showErrorModal: function(content, title, code) {
    if (content === 'NEED_PORTAL_LOGIN') {
      return
    }
    content = content || '未知错误'
    if (code) {
      content = content + '（错误码:' + code + '）'
    }
    wx.showModal({
      title: title || '加载失败',
      content: content,
      showCancel: false
    })
    console.warn('错误信息:', getCurrentPages())
  },
  showToast: function(title, icon, duration) {
    wx.showToast({
      title: title || '加载中',
      icon: icon || 'none',
      mask: true,
      duration: duration || 1000
    })
  },
  showMaskLoading: function(title,duration) {
    wx.showLoading({
      title: title || '加载中',
      mask: true,
      duration:duration||7000
    })
  },
  hideMaskLoading: function() {
    wx.hideLoading()
  },
})
