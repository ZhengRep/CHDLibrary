// miniprogram/pages/MyCode/index/search/search.js
const WXAPI = require('../../../../api/index')
const app = getApp()
import CustomPage from '../../../../utils/WeUI/CustomPage'
const htmlSnip=''

CustomPage({

  /**
   * 页面的初始数据
   */
  data: {
    elements: [],
  
  bottomModel: false, 
  htmlSnip,
  renderedByNode: false,
  titledetail:''
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const db = wx.cloud.database()
    db.collection('Guide').get()
    .then(res=>{
      console.log(res);
      this.setData({
        elements:res.data,
      })
    })
    .catch(err=>{
      console.log(err);
      app.showToast("未请求到数据，请检查网络")
    })

  },

  renderHtml() {
    this.setData({
      renderedByHtml: true
    })
  },

  showDetail: function (e) {
    console.log(e);
    var index = e.currentTarget.dataset.set
    this.setData({
      htmlSnip:this.data.elements[index].detail,
      titledetail:this.data.elements[index].title,
      renderHtml:true,
      bottomModel: true,
    })
  },
  //关闭提示按钮
  hideModal(e) {
    this.setData({
      bottomModel: false,
      renderHtml:false,
      //清空之前点击缓存数据
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