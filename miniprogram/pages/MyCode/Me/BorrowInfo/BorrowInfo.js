const app = getApp()
const WXAPI = require('../../../../api/index')
import CustomPage from '../../../../utils/WeUI/CustomPage'


CustomPage({

  /**
   * 页面的初始数据
   */
   data: {
    is_bind:false,
    is_teacher: false,
    user: undefined,
    history:[],
    now:[],
    loadFinish:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      app.showMaskLoading("正在加载")
      WXAPI.getUserInfo(this.data.user.id).then(res=>{
        this.setData({
          history:res.history.reverse(),
          now:res.now,
          loadFinish:true
        })
        app.hideMaskLoading()
      }).catch(err=>{
        console.log('获取信息错误:',err)
        app.hideMaskLoading()
        app.showErrorModal(err.msg)
      })
    }else{
      app.showToast('请先认证')
  }
    
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})