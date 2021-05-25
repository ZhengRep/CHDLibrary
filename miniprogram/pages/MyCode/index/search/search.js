// miniprogram/pages/MyCode/index/search/search.js
const WXAPI = require('../../../../api/index')
const app = getApp()
import CustomPage from '../../../../utils/WeUI/CustomPage'

CustomPage({

  data: {
    inputShowed: false,
    inputVal: "",
    i: 0,
    history:[],
    page:1,
    resLength:0,
    objRes:[],
    changepage:false,
    // tempValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    WXAPI.getSearchHistory().then(
      res=>{
        // console.log(res);
          this.setData({
            history:res
          })
      }
    ).catch(err=>{
        console.log(err);
    }),




    this.setData({
      search: this.search.bind(this),

  })
  
  },



  search: function (value,flag) {
      console.log(value,flag);
      if(flag){
        app.showMaskLoading('正在搜索')
        this.setData({
          page:1,
          objRes:[],
          resLength:0
        })
      }else{
        if(this.data.resLength%50==0){
          app.showMaskLoading('正在加载')
        }else{
          app.showToast('没有更多数据啦~')
          return;
        }
      }
      return new Promise((resolve, reject) => {
        WXAPI.SearchBook(value,this.data.page).then(
          res=>{
            if(res.length == 0){
              console.log(res);
              app.hideMaskLoading()
              app.showToast('未查询到相关书籍')
              resolve([])
            }else if(res.length != 0){
              console.log(res);             
              var objTemp = this.data.objRes.concat(res);
              app.hideMaskLoading();
              this.setData({
                page:this.data.page+1,
                resLength:this.data.resLength+res.length,
                objRes:objTemp
              })
              resolve(objTemp)
            }else{
              app.hideMaskLoading();
              app.showToast('请求错误')
            }
          }
        ).catch(err=>{
          app.hideMaskLoading()
          app.showErrorModal(err)
          reject(err)
        })
      })

  },


  selectResult: function (e) {
      wx.navigateTo({
        url: '/pages/MyCode/index/search/showdetail?options='+JSON.stringify(e.detail.item),
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