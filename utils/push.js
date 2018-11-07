import { Config } from '../utils/config.js';
// import { Token }  from '../utils/token.js';
// var token = new Token();
// var token = 
class Push {
  constructor() {
  }

  connect(){
    wx.connectSocket({
      url: 'ws://127.0.0.1:8080'
    });
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！');
    });

    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    });

    wx.onSocketClose(function (res) {
      console.log('连接关闭')
    })
  }

}

export {Push};