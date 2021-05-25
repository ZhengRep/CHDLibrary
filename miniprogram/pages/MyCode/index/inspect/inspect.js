import CustomPage from '../../../../utils/WeUI/CustomPage'
const app = getApp()
CustomPage({
  data: {
    is_bind:false,
    is_teacher: false,
    user: undefined,
    rules: [
      {
      name: 'room',
      rules: {required: true, message: '自习室必填'},
  },  
      {
      name: 'row',
      rules: {required: true, message: '排必填'},
  },  
      {
      name: 'col',
      rules: {required: true, message: 'col必填'},
  },  

  ],
  formData: {

  },
  showTopTips: false,
  error:'',
  dialogShow: true,
  buttons: [{text: '取消'}, {text: '确定'}],
  files: [],
  fileUploaded: false,
  fileId: '',
  tempFilePaths:[],
  urlFile:[],

  author:'',

  bookName:'',
  haveUpload:false,
  room:'',
  row:0,
  col:0,

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
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })

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
tapDialogButton(e) {
  if(e.detail.index==0){
    wx.navigateBack()
  }
  this.setData({
        dialogShow: false,
        showOneButtonDialog: false
    })
},

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            that.setData({
                files: that.data.files.concat(res.tempFilePaths)
            });
        }
    })
  },
  previewImage: function(e){
    wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files // 需要预览的图片http链接列表
    })

  },
  selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传

    // return false;
  },
  uplaodFile(files) {
    console.log('upload files', files)
    this.setData({
      tempFilePaths:files.tempFilePaths
    })

  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
  },
  delete(e){
  var index=e.detail.index
  console.log(index);
  var files=this.data.tempFilePaths
  var file=files.splice(index,1)
  this.setData({
    tempFilePaths:files
  })
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



  bindDateChange: function (e) {
    this.setData({
        date: e.detail.value,
        [`formData.date`]: e.detail.value
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
          //  上传操作 
          const imageSrc = this.data.tempFilePaths;
          this.setData({
            room:this.data.formData.room,
            row:this.data.formData.row,
            col:this.data.formData.col,
          })  
          app.showMaskLoading('正在提交',4000)
          if(imageSrc.length==0){
              this.toShare()
          }else{
              var myDate = new Date().getTime().toString();
              wx.cloud.uploadFile({
                cloudPath: 'Inspect/'+myDate, // 上传至云端的路径
                filePath: imageSrc[0], // 小程序临时文件路径
                config: {
                  env: 'cloud1-4ggmc6wo7b1e8647'
                },
                success: res => {
                  // 返回文件 ID
                  this.data.urlFile.push(res.fileID);
                  console.log('uploadImage success, res is:', res)
                  this.toShare()
                },
                fail({errMsg}) {
                  console.log('uploadImage fail, errMsg is', errMsg)
                  app.hideMaskLoading()
                  wx.showToast({
                  icon: 'none',
                  title: '提交失败'
                })
                }
              })
            
  
          }// 
        }
     })
    },
    toShare() {
      var time = this.getCurrentTime()
      var Pic = this.data.urlFile
      const data = {
        id:this.data.user.id,
         name:this.data.user.name,
        room:this.data.room,
        row:this.data.row,
        col:this.data.col,
        time:time,
        Pic:Pic
      }
      console.log('data',data);
      const db = wx.cloud.database()
      db.collection('Inspect').add({
        data:data,
        success: (res) => {
          console.log('success');
          // 在返回结果中会包含新创建的记录的 _id
          app.hideMaskLoading()
          wx.navigateBack()
          setTimeout(()=>{
            wx.showToast({
              title: '举报成功',
            })
          },1000)
          
          console.log('chenggong');
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
    },
  
  
  
    /**
   * 获取当前时间 格式：yyyy-MM-dd HH:MM:SS
   */
     getCurrentTime:function() {
      var date = new Date();//当前时间
      var month = date.getMonth() + 1;//月
      var day = date.getDate();//日
      var hour = date.getHours();//时
      var minute = date.getMinutes();//分
      
      //当前时间
      var curTime = month + "-" + day
              + " " + hour + ":" + minute;
      
      return curTime;
      // return [curTime,date];
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