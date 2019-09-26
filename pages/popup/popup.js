// pages/popup/popup.js
import { Token } from '../../utils/token.js';
var login=new Token()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.authorization();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.testingAuth();
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
  
  },
  //提前弹出授权窗口
  authorization: function () {
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success: function (res) {
              wx.showModal({
                title: '操作提示',
                showCancel: false,
                content: '授权成功',
                success: function () {
                  var token = wx.getStorageSync('token')
                  login.veirfyFromServer(token);
                  wx.switchTab({
                    url: '../home/home',
                  })
                }
              })
            },
            fail: function () {
              wx.showModal({
                title: '授权失败',
                showCancel: false,
                content: '必须获取授权才能访问',
                success: function () {
                  wx.redirectTo({
                    url: '../auth/auth',
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  //如果是重新获取token令牌而授权已有
  testingAuth:function(){
    var that = this;
    wx.getSetting({
      success:function(res){
        if (res.authSetting['scope.userLocation']) {
         wx.switchTab({
           url: '../home/home',
         })
        }
      }
    })
  }
})