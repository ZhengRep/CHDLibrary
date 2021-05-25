import CustomPage from '../../../../utils/WeUI/CustomPage'


CustomPage({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    list:[],
    status:{'35':'剔旧报废','36':'赠送出','37':'交换出','38':'丢失','39':'遗失赔偿',
    '3A':'下架装订','3B':'声明丢失','3C':'停借','41':'可借','42':'非可借',
    '43':'阅览','44':'业务用书','45':'保留本','46':'分馆藏书','33':'书刊补休',
    '34':'破损报废'}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(typeof(options.options));
    let vOption = JSON.parse(options.options)
    this.setData({
      title:vOption.title,
      list:vOption.list
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