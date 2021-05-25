import CustomPage from '../../../utils/WeUI/CustomPage'
const app=getApp()

CustomPage({
 
  data: {
    tabs : [
      {
        id:0,
        title: '读者动态',
        title2: '读者动态',
        info:[]
      },
      {
        id:1,
        title: '长图动态',
        title2: '长图动态',
        info:[]
      },
      {
        id:2,
        title: '新闻咨询',
        title2: '新闻咨询',
        info:[]
      },
      {
        id:3,
        title: '最新公告',
        title2: '最新公告',
        info:[]
      },
      {
        id:4,
        title: '活动发布',
        title2:'活动发布',
        info:[]
      },
    ],
    activeTab: 0,
    isTriggered:false,
    loadMore:false,
    page: 0,
    totalCount: 0, //数据总数
    pageNews: 0,
    totalCountNews: 0, //数据总数
    pageAnnounce: 0,
    totalCountAnnounce: 0, //数据总数
    feeds:[],
    haveLoad:false,
  },

  onLoad() {
    app.showMaskLoading('正在加载')
    this.getRefresh_0(0).then(res=>{
      app.hideMaskLoading()
    })
    .catch(err=>{
      app.hideMaskLoading();
    });
    setTimeout(()=>{
      this.getRefresh_2(0);
      this.getRefresh_3(0);
    },2000)
  },
  getRefresh_0(page){
    return new Promise((resolve,reject)=>{
      const db = wx.cloud.database()
      db.collection('Share').where({
        isShare:true,
      }).count({
        success: function (res) {
          console.log(res.total);
          that.setData({
            totalCount: res.total
          })
        }
      })
      db.collection('Share').orderBy('time','desc').where({
        isShare:true,
      }).skip(page).limit(20).get()
      .then(res=>{
        console.log('res');
        console.log(res);
        var tempArr=this.data.tabs[0].info.concat(res.data);
        console.log('tempArr',tempArr);
        this.setData({
          'tabs[0].info':tempArr,
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
  getRefresh_2(pageNews){
    return new Promise((resolve,reject)=>{
      const db = wx.cloud.database()
      db.collection('News').count({
        success: function (res) {
          console.log(res.total);
          that.setData({
            totalCountNews: res.total
          })
        }
      })
      db.collection('News').orderBy('time','desc').skip(pageNews).limit(10).get()
      .then(res=>{
        console.log('res');
        console.log(res);
        var tempArr=this.data.tabs[2].info.concat(res.data);
        console.log('tempArr',tempArr);
        this.setData({
          'tabs[2].info':tempArr,
           pageNews:this.data.pageNews+1
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
  getRefresh_3(pageAnnounce){
    return new Promise((resolve,reject)=>{
      const db = wx.cloud.database()
      db.collection('Announce').count({
        success: function (res) {
          console.log(res.total);
          that.setData({
            totalCountAnnounce: res.total
          })
        }
      })
      db.collection('Announce').orderBy('time','desc').skip(pageAnnounce).limit(10).get()
      .then(res=>{
        console.log('res');
        console.log(res);
        var tempArr=this.data.tabs[3].info.concat(res.data);
        console.log('tempArr',tempArr);
        this.setData({
          'tabs[3].info':tempArr,
           pageAnnounce:this.data.pageAnnounce+1
        })
        console.log('announce',this.data.tabs[3]);

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

  preview(event) {
    console.log('preview',event.currentTarget.dataset.cur)
    let currentUrl = event.currentTarget.dataset.cur
    let currentUrllist = event.currentTarget.dataset.piclist
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: currentUrllist // 需要预览的图片http链接列表
    })
  },
  onTabClick(e) {
    const index = e.detail.index
    this.setData({ 
      activeTab: index 
    })
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({ 
      activeTab: index 
    })
  },
  handleClick(e) {
    wx.navigateTo({
      url: './webview',
    })
  },
  getData:function(){
    wx.showToast({
      title: 'Loading',
    })
    wx.hideToast({
      complete: (res) => {
        console.log("hide");
        this.setData({
          isTriggered:false
        })
      },
    })
  },
  handleToLower_0:function(){
    let page = this.data.page;
    console.log('page',page);
    if(page*20>this.data.totalCount){
      app.showToast('到底咯~')
    }else{

      this.setData({
        haveLoad:true
      })
      this.getRefresh_0(page).then(res=>{
        this.setData({
          haveLoad:false
        })
      }).catch(err=>{
        app.showToast("加载错误，请检查网络")
      })
    }
    
  },
  handleToLower_2:function(){
    let pageNews = this.data.pageNews;
    console.log('page',pageNews);
    if(pageNews*10>this.data.totalCountNews){
      app.showToast('到底咯~')
    }else{

      this.setData({
        haveLoad:true
      })
      this.getRefresh_2(pageNews).then(res=>{
        this.setData({
          haveLoad:false
        })
      }).catch(err=>{
        app.showToast("加载错误，请检查网络")
      })
    }
    
  },
  handleToLower_3:function(){
    let pageAnnounce = this.data.pageAnnounce;
    console.log('page',pageAnnounce);
    if(pageAnnounce*10>this.data.totalCountAnnounce){
      app.showToast('到底咯~')
    }else{

      this.setData({
        haveLoad:true
      })
      this.getRefresh_3(pageAnnounce).then(res=>{
        this.setData({
          haveLoad:false
        })
      }).catch(err=>{
        app.showToast("加载错误，请检查网络")
      })
    }
    
  },
  toRefresh_0(){
    this.setData({
      page:0,
      'tabs[0].info':[],
    })
    this.getRefresh_0(0).then(res=>{
      this.setData({
        isTriggered:false
      })
      wx.showToast({
        title: '已刷新',
      })
    })
    
  },
  toRefresh_2(){
    this.setData({
      pageAnnounce:0,
      'tabs[2].info':[],
    })
    this.getRefresh_2(0).then(res=>{
      this.setData({
        isTriggered:false
      })
      wx.showToast({
        title: '已刷新',
      })
    })
    
  },
  toRefresh_3(){
    this.setData({
      pageAnnounce:0,
      'tabs[3].info':[],
    })
    this.getRefresh_3(0).then(res=>{
      this.setData({
        isTriggered:false
      })
      wx.showToast({
        title: '已刷新',
      })
    })
    
  },
  toMessDetail:function (e) {
    var tabsIndex=e.currentTarget.dataset.tabsindex
    var detailIndex=e.currentTarget.dataset.detailindex
    var tempVar = this.data.tabs[tabsIndex].info[detailIndex];
    // console.log(tempVar);
    var json = JSON.stringify(tempVar)
    var en = encodeURIComponent(json)
    wx.navigateTo({
      url: '/pages/MyCode/Message/MessDetial?options='+en,
    })
},


})