const app = getApp()
const WXAPI = require('../../../api/index')
import CustomPage from '../../../utils/WeUI/CustomPage'
CustomPage({

  /**
   * 页面的初始数据
   */
  data: {
      // remind: '加载中',
      help_status: false,
      userid_focus: false,
      passwd_focus: false,
      userid: '',
      passwd: '',
      angle: 0,
      questionShow: false,
      questionTitle: '提示',
      questionContent: '请使用长安大学信息门户账号及密码进行身份验证',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  check: function() {
    let _this = this
    console.log('Identify，',app.globalData.token);
    let data = {}
    if (!_this.data.userid || !_this.data.passwd) {
      app.showErrorModal('账号及密码不能为空', '提醒');
      return false
    }
    if (!app.globalData.token) {
      return false
    }
    this.bind()
  },

  bind: function() {
    let that = this
    app.showToast('身份验证中...', 'loading')
    console.log('Identify');
    WXAPI.bind(app.globalData.token, that.data.userid, that.data.passwd)
      .then(res => {
        if(res.code ===1){
          app.showToast('验证成功', 'success')
          //app.initRequest()
          app.loginFunc().then(res => {
            const pages = getCurrentPages()
            let prevPage = pages[pages.length - 2]
            prevPage.setData({
              'refreshPage': true
            })
            wx.navigateBack()
          })
          //
        }else{
          app.showErrorModal(res.msg, '验证失败')
        }
      })
      .catch(err => {
        app.showErrorModal(err.msg)
      })
  },
  showModal: function() {
    this.setData({
      questionShow: true
    })
  },
  hideModal: function() {
    this.setData({
      questionShow: false
    })
  },
  useridInput: function(e) {
    this.setData({
      userid: e.detail.value
    });
    if (e.detail.value.length >= 12) {
      wx.hideKeyboard()
    }
  },
  passwdInput: function(e) {
    this.setData({
      passwd: e.detail.value
    })
  },
  inputFocus: function(e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      })
    }
  },
  inputBlur: function(e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      })
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      })
    }
  },
})