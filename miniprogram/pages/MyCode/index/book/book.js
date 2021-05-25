import CustomPage from '../../../../utils/WeUI/CustomPage'
const app = getApp()

CustomPage({

  /**
   * 页面的初始数据
   */
  data: {
    is_bind:false,
    is_teacher: false,
    user: undefined,
    rules: [{
      name: 'address',
      rules: {required: true, message: '捐赠地址必填'},
  },  
  {
      name: 'note',
      rules: [{required: false, message: ''}],
  }, 
  ],
  formData: {

  },
  showTopTips: false,
  error:'',
  book:'',
  

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
    }
    if(!this.data.user.info.wxmobile){
      app.showToast('请先绑定手机号')
      var rule=[{
        name: 'mobile',
        rules: [{required: true, message: '电话必填'}, {mobile: true, message: '号码格式不对'}],
    },{
      name: 'address',
      rules: {required: true, message: '捐赠地址必填'},
    },  
    {
        name: 'note',
        rules: [{required: false, message: ''}],
    }, ]
      this.setData({
        rules:rule
      })
    }
  },

  bindDateChange: function (e) {
    this.setData({
        date: e.detail.value,
        [`formData.date`]: e.detail.value
    })
},
  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
  },
  bindTextAreaBlur:function (e) {
    console.log(e);
    this.setData({
      book:e.detail.value
    })
  },

  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
        console.log('valid', valid, errors)
        if (!valid) {
            const firstError = Object.keys(errors)
            if (firstError.length) {
                this.setData({
                    error: errors[firstError[0]].message
                })

            }
        } else {
          if(this.data.user.wxmobile){
            var phoneNum = this.data.user.mobile
          }else{
            var phoneNum = this.data.formData.mobile
          }
          app.showMaskLoading('正在提交')
          setTimeout(()=>{
            var donateInfo ={
              id:this.data.user.id,
              name:this.data.user.name,
              mobile:phoneNum,
              note:this.data.formData.note,
              address:this.data.formData.address,
              book:this.data.book,
            }
            console.log(donateInfo);
            const db = wx.cloud.database()
            db.collection('Book').add({
              data:donateInfo,
              success: (res) => {
                console.log('success');
                // 在返回结果中会包含新创建的记录的 _id
                app.hideMaskLoading()
                
                wx.navigateBack()
                setTimeout(()=>{
                  wx.showToast({
                    title: '提交成功',
                  })
                },1000)
              },
              fail: (err) => {
                console.log('err');
                app.hideMaskLoading()
                wx.showToast({
                  title: '提交失败',
                  icon:none
                })
                console.error('[数据库] [新增记录] 失败：', err)
              },
              complete: () => {
              }
            })

          },500)
        }
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