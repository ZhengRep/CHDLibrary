module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ({

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const app=getApp()
const defaultGridProps = {
  target: 'self',
  url: '',
  openType: 'navigate',
  delta: 1,
  appId: '',
  path: '',
  extraData: '',
  version: 'release',
  hoverClass: 'navigator-hover',
  hoverStopPropagation: false,
  hoverStartTime: 50,
  hoverStayTime: 600,
  bindsuccess: () => {},
  bindfail: () => {},
  bindcomplete: () => {}
};
Component({
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/
  },
  properties: {
    extClass: {
      type: String,
      value: ''
    },
    grids: {
      type: Array,
      value: [],
      observer: '_onGridsChange'
    }
  },
  data: {
    innerGrids: [],
  },

  ready() {},

  methods: {
    _onGridsChange(grids) {
      if (grids) {
        this.setData({
              innerGrids: grids.map(grid => Object.assign({}, defaultGridProps, grid))
            });
        
      }
    },
    isBind:function(e){
      if (app.globalData.is_bind !== true){
        //未绑定门户认证，先跳转绑定页面
        setTimeout(()=>{
          wx.navigateTo({
            url: '/pages/MyCode/login/login',
          })
          app.showToast('需先认证才能访问','none',1000);
        },1000)
      }else{
        wx.navigateTo({
          url: e.currentTarget.dataset.set,
        })
      }
    },

    getUserProfile:function (e) {
      if(app.globalData.hasUserInfo == false){
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
          desc: '用于评论分享昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            console.log(res);
            app.globalData.hasUserInfo=true,
            app.globalData.nickName=res.userInfo.nickName,
            wx.setStorage({
              data: res.userInfo,
              key: 'userInfo',
            })
          }
        })
      }
    }
  },
  handleContact:function () {
    wx.cloud.callFunction({
        name: 'getCustomData'  // 名字和云函数名字对应
    }).then(res => {
        console.log(res)
    }).catch(err => {
        console.error(err)
    })
  },

});

/***/ })

/******/ });