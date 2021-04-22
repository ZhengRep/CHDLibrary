const app = getApp()
const WXAPI = require('../../../api/index')
import CustomPage from '../../../utils/WeUI/CustomPage'


CustomPage({

  /**
   * 页面的初始数据
   */
  data: {

    is_bind:false,
    is_teacher: false,
    user: undefined,

    list:[
      {
        id: 'administrator',
        name: '管理员',
        open: false,
        pages: [
          { zh: '发布公告', url: 'telescopic/telescopic' },
          { zh: '替换图片', url: 'linebreak/linebreak' },
          { zh: '书籍处理', url: 'sidenavigation/sidenavigation' },
          { zh: '问题处理', url: 'pagination/pagination' },
      ]
    },
      {
          id: 'myinfo',
          name: '我的信息',
          open: false,
          pages: [
              { zh: '读者信息', url: 'telescopic/telescopic' },
              { zh: '借阅信息', url: 'linebreak/linebreak' },
              { zh: '其他信息', url: 'pagination/pagination' },
          ]
      },
      {
          id: 'mycomment',
          name: '我的评论',
          open: false,
          // pages: [
          // ]
      },
      {
          id: 'identify',
          name: '身份验证',
          open: false,
          // pages: [
          // ]
      },
      {
          id: 'phonebind',
          name: '手机绑定',
          open: false,
          // pages: [
          // ]
      },
      {
          id: 'phonechange',
          name: '切换绑定',
          open: false,
          // pages: [
          // ]
      },
      {
          id: 'feedback',
          name: '问题反馈',
          open: false,
          // pages: [
          // ]
      },
    ]
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getPhoneNumber(e) {
    var _this = this
    wx.showNavigationBarLoading()
    console.log(app.globalData.token)
    WXAPI.getPhoneNumber(app.globalData.token, e.detail.iv, e.detail.encryptedData)
      .then(res => {
        if (res.code === 1) {
          _this.setData({
            'user.info.mobil': res.data,
            'user.info.wxmobile': true
          })
          app.showToast(res.msg,'success')
        }
        wx.hideNavigationBarLoading()
      })
      .catch(err => {
        console.log('绑定手机:',err)
        app.showErrorModal(err.msg)
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
   onShow: function() {
    let _this = this
    if (app.globalData.is_bind) {
      const _user = wx.getStorageSync('_user')

      _this.setData({
        'is_bind': true,
        'is_teacher': _user.type === '教职工' ? true : false
      })
      
      if (JSON.stringify(_this.data.user) !== JSON.stringify(_user)) {
        _this.setData({
          'user': _user,
          'time': wx.getStorageSync('_time')
        })
      }
    }
  },

  kindToggle: function (e) {
        const id = e.currentTarget.id,
            list = this.data.list
        for (let i = 0, len = list.length; i < len; ++i) {
            if (list[i].id == id) {
                list[i].open = !list[i].open
            } else {
                list[i].open = false
            }
        }
        // const extendedList = this.data.extendedList.map((item) => ({...item, open: false}))
        this.setData({
            list: list,
            // extendedList,

        })
    },
    kindExtenedListToggle(e) {
        const id = e.currentTarget.id; 
        const extendedList = this.data.extendedList
        for (let i = 0, len = extendedList.length; i < len; ++i) {
            if (extendedList[i].id == id) {
            extendedList[i].open = !extendedList[i].open
            } else {
            extenedList[i].open = false
            }
        }
        const list = this.data.list.map((item) => ({...item, open: false}))
        this.setData({
            extendedList,
            list,
        })
    },
    themeToggle() {
        const App = getApp()

        if (App.themeChanged) {
            if (App.globalData.theme === 'light') {
                App.themeChanged('dark')
            } else {
                App.themeChanged('light')
            }
        }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})