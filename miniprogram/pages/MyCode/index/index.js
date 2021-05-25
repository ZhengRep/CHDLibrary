const { GRID_DEMO_URL } = getApp().globalData
const app = getApp()
const WXAPI = require('../../../api/index')
import CustomPage from '../../../utils/WeUI/CustomPage'

CustomPage({
  data: {
    cardCur: 0,
    userInfo: wx.getStorageSync('_user'),//app.globalData._user,
    swiperList: [],
  
    grids: [
      {
          imgUrl: app.globalData.iconTabbar+'search.png',
          url: '/pages/MyCode/index/search/search',
          text: '图书查询',
          openType:'null'
      },
      {
          imgUrl: app.globalData.iconTabbar+'seat.png',
          url: '/pages/MyCode/index/seat/seat',
          text: '座位预约',
          openType:'null'
      },
      {
          imgUrl: app.globalData.iconTabbar+'consult.png',
          url: '',
          text: '咨询反馈',
          openType:'contact'
      },
      {
          imgUrl: app.globalData.iconTabbar+'guide.png',
          url: '/pages/MyCode/index/guide/guide',
          text: '馆内引导',
          openType:'null'
      },
      {
          imgUrl: app.globalData.iconTabbar+'share.png',
          url: '/pages/MyCode/index/share/share',
          text: '评论分享',
          openType:'getUserInfo'
      },
      {
          imgUrl: app.globalData.iconTabbar+'book.png',
          url: '/pages/MyCode/index/book/book',
          text: '图书捐赠',
          openType:'null'
      },
      {
          imgUrl: app.globalData.iconTabbar+'inspect.png',
          url: '/pages/MyCode/index/inspect/inspect',
          text: '座位监督',
          openType:'null'
      },
      {
          imgUrl: app.globalData.iconTabbar+'propose.png',
          url: '/pages/MyCode/index/propose/propose',
          text: '图书推荐',
          openType:'null'
      },
  ]
   
  },
  onLoad:async function(){
    

    this.towerSwiper('swiperList');
    const that = this; 
    // 登录前置检查
    app.loginFunc(app.globalData.token);
    if (!app.globalData.token){
      await app.loginFunc()
    }
    if (app.globalData.is_bind !== true){
      app.showToast('请先进行身份认证')
      //未绑定门户认证，先跳转绑定页面
      setTimeout(()=>{
        wx.navigateTo({
          url: '/pages/MyCode/login/login',
        })
      },1000)
    }

    const db = wx.cloud.database()
    db.collection('BannerImage').get()
    .then(res=>{
      this.setData({
        swiperList:res.data,
      })
    })
    .catch(err=>{
      console.log(err);
    })

   

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