import {Token} from '../../utils/token.js';
import { Login } from 'login-model.js';
var login = new Token();
var loginM = new Login();
var app = getApp();
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:'',
    loading:false,
    disabled:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
   
  },
  /**
   * 获取输入用户名
   */
  usernameInput:function(e){
    this.setData({
      username: e.detail.value
    }) 
  },
  /**
   * 获取输入密码
   */
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  /**
   * 调用登录接口获取token
   */
  login:function(){
    var that = this;
    var username = that.data.username,
      password = that.data.password;
    that.setData({
      loading: true,
      disabled: true
    })
    if (this.data.username.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'none',
        duration: 1500,
        complete: function () {
          that.setData({
            loading: false,
            disabled: false
          })
        }
      })
    }else{
      login.getTokenFromServer(username,password, (res) => {
        if (res.data) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            success: function () {
              that.setData({
                loading: false,
                disabled: false
              })
            }
          })
        } else {
          login.veirfyFromServer(res)
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1500,
            success: function () {
              that.setData({
                loading: false,
                disabled: false
              })
              wx.redirectTo({
                url: '../popup/popup',
              })
            }
          })
        }
      });
    }
  },
  submitInfo: function (e) {
    loginM.dealFormIds(e.detail.formId);
    return true;
  }, 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})