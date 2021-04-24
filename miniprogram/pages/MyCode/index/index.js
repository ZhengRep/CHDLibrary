const { GRID_DEMO_URL } = getApp().globalData
const app = getApp()

Page({
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      userInfo: wx.getStorageSync('_user'),//app.globalData._user,
      //后期考虑云数据库，考虑到教师端的操作
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    grids: [
      {
          imgUrl: app.globalData.iconTabbar+'search.png',
          url: '/pages/MyCode/index/search/search',
          text: '图书查询'
      },
      {
          imgUrl: app.globalData.iconTabbar+'seat.png',
          url: '/pages/MyCode/index/seat/seat',
          text: '座位预约'
      },
      {
          imgUrl: app.globalData.iconTabbar+'consult.png',
          url: '/pages/MyCode/index/consult/consult',
          text: '咨询反馈'
      },
      {
          imgUrl: app.globalData.iconTabbar+'guide.png',
          url: '/pages/MyCode/index/guide/guide',
          text: '馆内引导'
      },
      {
          imgUrl: app.globalData.iconTabbar+'share.png',
          url: '/pages/MyCode/index/share/share',
          text: '评论分享'
      },
      {
          imgUrl: app.globalData.iconTabbar+'book.png',
          url: '/pages/MyCode/index/book/book',
          text: '捐书荐书'
      },
  ]
   
  },
  onLoad() {
    this.towerSwiper('swiperList');
    const that = this 
    // 登录前置检查
    //await app.loginFunc(app.globalData.token)
    // console.log('[page index] onload globalData:',app.globalData)
    if (!app.globalData.token){
      app.loginFunc()
    }
    if (app.globalData.is_bind !== true){
      //未绑定门户认证，先跳转绑定页面
      app.showToast('请先进行身份认证')
      setTimeout(()=>{
        wx.navigateTo({
          url: '/pages/more/login',
        })
      },1000)
    }
  },
  

  go: function(e) {
    //console.log('[page:index] globalData:',app.globalData)
    const that = this

    // 1.判断当前应用是否可用，如果不可用，弹出不可用原因
    const item = e.currentTarget.dataset.item
    if (!item.usable) {
      app.showToast(item.errMsg)
      return
    }

    // 2.当前应用要求绑定，而用户为绑定，则弹出提示，并导航到绑定界面
    if (!item.permissions.unauthorized && !app.globalData.is_bind) {
      console.log('需要信息门户认证才能访问')
      app.showToast('需要信息门户认证才能访问')
      wx.navigateTo({
        url: 'pages/MyCode/login/login'
      })
      return
    }
  },
  
  // 轮播图
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },


})