import CustomPage from '../../../../utils/WeUI/CustomPage'
const app = getApp()
CustomPage({

  data: {
    openid: '',
    nickName:'',
    shareText:'',
    userName:'',
    isAgree:true,
    rules: [ {
          name: 'bookName',
          rules: {required: true, message: '请输入书名'},
            },
        {
          name: 'author',
          rules: {required: true, message: '请输入作者'}
    }],
    formData: {

    },
    showTopTips: false,
    files: [],
    error:'',
    fileUploaded: false,
    fileId: '',
    comment:'',
    tempFilePaths:[],
    urlFile:[],

    author:'',
    bookName:'',
    shareTime:'',
    haveUpload:false,
    count:0,
    newContent: '',

  },

  onLoad() {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid,
      })
    } else {
      wx.showLoading({
        title: '正在初始化...'
      })
      app.getUserOpenIdViaCloud()
        .then(openid => {
          this.setData({
            openid
          })
          wx.hideLoading()
          return openid
        }).catch(err => {
          console.error(err)
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '初始化失败，请检查网络'
          })
        })
    }
    if(!app.globalData.hasUserInfo){
      setTimeout(()=>{
          this.setData({
          nickName:app.globalData.nickName,
          selectFile: this.selectFile.bind(this),
          uplaodFile: this.uplaodFile.bind(this)
        })
      },6000)
    }else{
      this.setData({
        nickName:app.globalData.nickName,
        selectFile: this.selectFile.bind(this),
        uplaodFile: this.uplaodFile.bind(this)
      })
    }
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

  bindAgreeChange: function (e) {
    this.setData({
        isAgree: !this.data.isAgree
    });
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
    this.setData({
      comment:e.detail.value
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
            
            const imageSrc = this.data.tempFilePaths;
            console.log('iamgeSrc',imageSrc);

        } else {
          //  上传操作 
          let bookNameDeal = this.data.formData.bookName.replace('《','').replace('》','');
          this.setData({
            author:this.data.formData.author,
            bookName:bookNameDeal
          })     
          app.showMaskLoading('正在分享',4000)
          this.toUploadImg();
          
        }
      })
      
    },

    toUploadImg(){
      const imageSrc = this.data.tempFilePaths
        if(imageSrc.length == 0){
          this.toShare()
        }else
        {
          for(var i=0;i<imageSrc.length;i++){
            var myDate = new Date().getTime().toString();
            wx.cloud.uploadFile({
              cloudPath: 'SharePic/'+myDate, // 上传至云端的路径
              filePath: imageSrc[i], // 小程序临时文件路径
              config: {
                env: 'cloud1-4ggmc6wo7b1e8647'
              },
              success: res => {
                // 返回文件 ID
                this.data.urlFile.push(res.fileID);
                console.log('uploadImage success, res is:', res)
                console.log('i am here',i,imageSrc.length);
                this.setData({
                  count:this.data.count+1
                })
                // 1 2 3
                if(this.data.count==imageSrc.length){
                  setTimeout(()=>{

                    this.toShare()
                  },2000)
                }                 
              },
              fail({errMsg}) {
                console.log('uploadImage fail, errMsg is', errMsg)
                app.hideMaskLoading()
                wx.showToast({
                icon: 'none',
                title: '分享失败'
              })
              }
            })
          }
        }
    },
    
    
    toShare() {
    // this.setData({
    //   haveUpload:true
    // })
    var time = this.getCurrentTime()
    console.log('time',time);
    var sharePic = this.data.urlFile
    const shareManInfo = {
      nickName:app.globalData.nickName,
      avatarUrl:app.globalData.avatarUrl,
      userId:app.globalData.userId
    }
    const shareContent ={
      bookName:this.data.bookName,
      author:this.data.author,
      comment:this.data.comment,
      author:this.data.author,
      time:time
    }
    var support = {
      num:0,
      talk:[],
    }
    var data= {
      openid:this.data.openid,
      shareManInfo:shareManInfo,
      shareContent:shareContent,
      sharePic:sharePic,
      support:support,
      isShare:this.data.isAgree
    }
    console.log('data',data);
    const db = wx.cloud.database()
    db.collection('Share').add({
      data:data,
      success: (res) => {
        console.log('success');
        // 在返回结果中会包含新创建的记录的 _id
        app.hideMaskLoading()
        wx.navigateBack()
        setTimeout(()=>{
          wx.showToast({
            title: '分享成功',
          })
        },1000)
        
        console.log('chenggong');
      },
      fail: (err) => {
        console.log('err');
        app.hideMaskLoading()
        wx.showToast({
          title: '分享失败',
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
})