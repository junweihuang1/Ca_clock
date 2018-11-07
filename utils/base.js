import { Config } from '../utils/config.js';
var app = getApp();
class Base{
  constructor(){
   this.baseRequestUrl = Config.restUrl;
  }

  //请求

  request(params){
    var that = this;
    var url = this.baseRequestUrl + params.url;

    if (!params.type) {
      params.type = 'GET';
    }

    wx.request({
      url: url,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'token':wx.getStorageSync('token')
      },
      method: params.type,
      success: function(res) {
        if (res.data.tokenVerify === false){
          wx.showModal({
            showCancel: false,
            title: '登录已失效',
            content: '请重新登录',
            confirmText: '去登录',
            confirmColor: '#0190a0',
            complete: function () {
              wx.redirectTo({
                url: '../login/login'
              })
            }
          })
          // wx.closeSocket();//关闭连接
          params.callback && params.callback(false);
        }else{
          params.callback && params.callback(res.data);
        }
      }
    })

  }
  
  //获得元素上绑定的值
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  }

  //全局存放formId
  dealFormIds(formId){
    let formIds = app.globalData.gloabalFomIds;//获取全局数据中的推送码gloabalFomIds数组
    if (!formIds) formIds = [];

    let data = {
      form_id:formId,
      expice: parseInt(new Date().getTime() / 1000) + 604800 //计算7天后的过期时间时间戳
    }

    formIds.push(data);

    app.globalData.gloabalFomIds = formIds; //保存推送码并赋值给全局变量

  }

  //发送formid给服务器存放
  sendFormId(formIds, callback) {
    var params = {
      url: 'receive',
      data: formIds,
      type: 'POST',
      callback: function (data) {
        callback && callback(data);
      }
    }
    this.request(params);
  }

  //发送模板消息
  sendMssage(msgType,address, callback) {
    var params = {
      url: 'SendMsg',
      data: {
        type: msgType,
        address:address
      },
      type: 'POST',
      callback: function (data) {
        callback && callback(data);
      }
    }
    this.request(params);
  }
}

export {Base};