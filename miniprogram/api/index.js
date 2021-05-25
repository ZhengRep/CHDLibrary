//封装网络请求
const CONFIG = require('../config')
const utils = require('../utils/util')
const request = (url, method, data,flag=true) => {
  const system = wx.getSystemInfoSync()
  let _url='';
  if(flag){
    _url = CONFIG.api_build;
  }else{
    _url = CONFIG.api_buildEx;
  }
  // console.log('_url',url);
  return new Promise((resolve, reject,flag) => {
    wx.request({
      url:_url + url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        // console.log(res);
        if (res.statusCode !== 200) {
          console.log('api 网络失败',res.statusCode);
          reject({
            msg: '请求失败',
            statusCode: res.statusCode
          })
        }else if(res.statusCode == 200){
          resolve(res.data)
        }
        // 小程序项目中 返回值code为1 才为正确
        if (res.data.code === 1) {
          resolve(res.data)
        } else {
          reject({
            msg: res.data.msg || '数据错误',
            statusCode: res.statusCode
          })
        }
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

/**
 * API
 * 约定: 请求参数均使用POST传递， 参数只有token或code的时候，不用加密，有其他参数时，必须使用key加密
 */
 module.exports = {
    request,
    init: (token) => {
      return request('/wxuser/init_token', 'post', {
        token: token
      })
    },
    checkToken: (token) => {
      return request('/wxuser/check_token', 'post', {
        token
      })
    },
    login: (code) => {
      console.log('api login start');
      return request('/wxuser/login', 'post', {
        code: code
      })
    },
    // 绑定门户账号
    bind: (token, stuid, passwd) => {
      let formData = {
        token: token,
        stuid: stuid,
        passwd: passwd
      }
      return request('/wxuser/bind', 'post', utils.key(formData))
    },

    getPhoneNumber: (token, iv, encryptedData) => {
      let formData = {
        token: token,
        iv: iv,
        encryptedData: encryptedData
      }
      return request('/wxuser/wxmobile', 'post', utils.key(formData))
    },
    

  //书籍查询
  SearchBook:(KeyWord,page)=>{
    console.log('Search',KeyWord);
    console.log('page',page);
    return request('/library/searchbook?title='+KeyWord+'&page='+page+'&perpage=50','post',null)
  },
  getSearchHistory:()=>{
    return request('/library/getsearhistory','post')
  },
  getUserInfo:(userid)=>{
    return request('/library/getuserinfo?user_id='+userid,'post')
  }
}