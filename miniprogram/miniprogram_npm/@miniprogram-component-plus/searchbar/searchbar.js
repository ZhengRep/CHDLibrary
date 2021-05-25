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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ({

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
const app = getApp()
const WXAPI = require('../../../api/index')

Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    extClass: {
      type: String,
      value: ''
    },
    focus: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: '搜索'
    },
    value: {
      type: String,
      value: ''
    },
    search: {
      // 返回Promise的函数
      // @ts-ignore
      type: Function,
      value: null
    },
    history: {
      // 返回Promise的函数
      // @ts-ignore
      type: Array,
      value: null
    },
    throttle: {
      // 500ms内只会调用一次search函数
      type: Number,
      value: 500
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    cancel: {
      type: Boolean,
      value: true
    },
  
  },
  data: {
    result: [], // 搜索结果

  },

  /* @ts-ignore */
  lastSearch: Date.now(),
  lifetimes: {
    // @ts-ignore
    attached() {
      // @ts-ignore
      if (this.data.focus) {
        this.setData({
          searchState: true
        });
      }
    }

  },
  methods: {
    clearInput() {
      // @ts-ignore
      this.setData({
        value: '',
        focus: true,
        result: []
      }); // @ts-ignore

      this.triggerEvent('clear');
    },

    // @ts-ignore
    inputFocus(e) {
      this.setData({
          searchState: true
      })
      // @ts-ignore
      this.triggerEvent('focus', e.detail);
    },

    // @ts-ignore
    inputBlur(e) {
      this.setData({
        focus: false
      });
      
      this.triggerEvent('blur', e.detail);//之前在上面
      console.log('inputBlur',e);
      if(e.detail.cursor != 0){
        this.data.search(this.data.value,true).then(json => {
          this.setData({
            result: json
          });
          console.log('new result',json);
        }).catch(err => {
          console.error('search error', err);
        });
      }
    },

    showInput() {
      this.setData({
        focus: true,
        searchState: true
      });
    },

    hideInput() {
      this.setData({
        searchState: false,
        result:[],
        value:''
      });
      this.triggerEvent('cancel');
    },

    // @ts-ignore
    inputChange(e) {
      this.setData({
        value: e.detail.value,
        result:[]
      });
      this.triggerEvent('input', e.detail);
      console.log('inputChange执行');
      
    },

    // @ts-ignore
    selectResult(e) {
      console.log('selectResult',e);
      const {
        index
      } = e.currentTarget.dataset;
      const item = this.data.result[index];
      this.triggerEvent('selectresult', {
        index,
        item
      });
    },
    handleToLowerhis:function(){
      app.showToast('到底咯~')
    },
    handleToLowersea:function(){
      this.data.search(this.data.value,false).then(json => {
        this.setData({
          result: json
        });
        console.log('new result',json);
      }).catch(err => {
        console.error('search error', err);
      });

    },




  }
});

/***/ })

/******/ });