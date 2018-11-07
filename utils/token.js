import { Config } from 'config.js';
import { Push } from 'push.js';
var push = new Push();
class Token {

  constructor() {
    this.verifyUrl = Config.restUrl + 'token/verify';
    this.tokenUrl = Config.restUrl + 'token';
  }
  //login检测
  initialLogin() {
    var that = this;
    var token = wx.getStorageSync('token');
    if (!token) {
      wx.showToast({
        title: '检测到您尚未登录，正在为您跳转',
        icon: 'none',
        image: '',
        duration: 1000,
        mask: true,
        success:function(){
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      })
    } else {
      this.veirfyFromServer(token);
    }
  }
  //从服务器获取token
  getTokenFromServer(usernmae, password, callback) {
    var that = this;
    wx.login({
      success:function(res){
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          data: {
            'username': usernmae,
            'password': password,
            'code':res.code
          },
          success: function (res) {
            if (res.data.msg) {
              callback && callback(res.data);
            } else {
              wx.setStorageSync('token', res.data.token);
              callback && callback(true);
            }
          }
        })
      }
    })
  }
  //携带令牌从服务器校验token令牌
  veirfyFromServer(token) {
    var that = this;
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      data: {
        'token': token
      },
      success: function (res) {
        if (!res.data.isVerify) {
          wx.showModal({
            showCancel: false,
            title: '登录已失效',
            content: '请重新登录',
            confirmText: '去登录',
            confirmColor: '#0190a0',
            complete: function () {
              wx.redirectTo({
                url: '/pages/login/login',
              })
            }
          })
        }
      }
    })
  }
}

export { Token };