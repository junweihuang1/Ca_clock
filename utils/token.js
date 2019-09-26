import { Config } from 'config.js';
import { Push } from 'push.js';
var push = new Push();
class Token {
  constructor() {
    this.verifyUrl = Config.restUrl + 'loginVerify';
    this.getUserUrl = Config.restUrl + 'getUser';
  }
  //login检测
  initialLogin() {
    //var that = this;
    var token = wx.getStorageSync('token');
    if (!token) {
      setTimeout(()=>{
        wx.redirectTo({
          url: '/pages/login/login'
        })
      },500)
    } else {
      this.veirfyFromServer(token);
    }
  }
  //从服务器获取token
  getTokenFromServer(username, password, callback) {
    wx.request({
      url: this.verifyUrl,
      data: {
        username: username,
        password: password,
        pcOrApp: 'minApp'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: (res) => {
        if(res.data.code=="20000"){
          //callback && callback(true);
          callback && callback(res.data.token);
          wx.setStorageSync('token', res.data.token);
        }else{
          callback && callback(res);
        }
      }
    })
  }
  //携带令牌从服务器校验token令牌
  veirfyFromServer(token) {
    wx.request({
      url: this.getUserUrl,
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'token': token
      },
      method: 'GET',
      success: (res) => {
        if (res.data.errorCode == 10002){          
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
        } else {
          wx.setStorageSync('uid', res.data.data.userid)
          wx.setStorageSync('username', res.data.data.username)
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  }
}

export { Token };