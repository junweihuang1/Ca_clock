import { Token } from 'utils/token.js';
// import { Push } from 'utils/push.js';
var login = new Token();
// var push = new Push();
var token = wx.getStorageSync('token');
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    login.initialLogin();
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function () {
    // login.initialLogin();
    //判断用户版本是否支持相关组件
    var edit = wx.canIUse('button.open-type.openSetting');
    if (edit == false) {
      wx.redirectTo({
        url: '/pages/edition/edition'
      })
    }
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    // wx.closeSocket();
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  },
  /**
   * fomIdc存放
   */
  globalData:{
    gloabalFomIds:[]
  }
})
