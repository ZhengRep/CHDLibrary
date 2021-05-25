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
    rules: [
      {
      name: 'bookName',
      rules: {required: true, message: '书名必填'},
  },  
      {
      name: 'author',
      rules: {required: true, message: '作者必填'},
  },  
      {
      name: 'ISBN',
      rules: {required: true, message: 'ISBN必填'},
  },  

  ],
  formData: {

  },
  showTopTips: false,
  error:'',
  recomment:'',
  

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
      recomment:e.detail.value
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
          app.showMaskLoading('正在提交')
          setTimeout(()=>{
            var donateInfo ={
              id:this.data.user.id,
              name:this.data.user.name,
              bookName:this.data.formData.bookName,
              author:this.data.formData.author,
              ISBN:this.data.formData.ISBN,
              recomment:this.data.recomment,
            }
            console.log(donateInfo);
            const db = wx.cloud.database()
            db.collection('Propose').add({
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