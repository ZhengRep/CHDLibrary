import CustomPage from '../../../../utils/WeUI/CustomPage'
const app=getApp()

CustomPage({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    page: 0,
    totalCount: 0, //数据总数
    haveLoad:false,
    list:[],
    loading:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.showMaskLoading('正在加载')
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid,
      })
      this.initLoad();
    } else {
      app.getUserOpenIdViaCloud()
        .then(openid => {
          this.setData({
            openid
          })
          this.initLoad()
          return openid
        }).catch(err => {
          console.error(err)
          app.hideMaskLoading();
          wx.showToast({
            icon: 'none',
            title: '初始化失败，请检查网络'
          })
        })
    }
   

  },
  initLoad:function(){
    console.log('_openid',this.data.openid);
    this.getRefresh(0).then(res=>{
      app.hideMaskLoading()
      this.setData({
        loading:true
      })
    })
    .catch(err=>{
      app.hideMaskLoading();
      this.setData({
        loading:true
      })
    });
  },

  getRefresh(page){
    return new Promise((resolve,reject)=>{
      const db = wx.cloud.database()
      db.collection('Share').where({
        _openid:this.data.openid
      }).count({
        success: function (res) {
          console.log(res.total);
          that.setData({
            totalCount: res.total
          })
        }
      })
      // console.log('')
      db.collection('Share').orderBy('time','desc').where({
        _openid:this.data.openid
      }).skip(page).limit(20).get()
      .then(res=>{
        console.log('res');
        console.log(res);
        var tempArr=this.data.list.concat(res.data);
        console.log('tempArr',tempArr);
        this.setData({
           list:tempArr,
           page:this.data.page+1
        })
        resolve(res)
        return res;
      })
      .catch(err=>{
        console.log(err);
        app.showToast("未请求到数据，请检查网络")
        reject(err)
      })
      console.log('end');
      
    })
  },
  handleToLower:function(){
    let page = this.data.page;
    console.log('page',page);
    if(page*20>this.data.totalCount){
      app.showToast('到底咯~')
    }else{

      this.setData({
        haveLoad:true
      })
      this.getRefresh(page).then(res=>{
        this.setData({
          haveLoad:false
        })
      }).catch(err=>{
        app.showToast("加载错误，请检查网络")
      })
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