// pages/auth/auth.js
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
  
  },
  //监听用户授权(回调获取)
  setting:function(res){
    var that = this;
    if (res.detail.authSetting['scope.userLocation']){
      wx.showToast({
        title: '授权成功',
        icon: 'success',
        duration: 2000,
        success:function(){
          wx.switchTab({
            url: '../home/home'
          })
        }
      })
    }else{
      wx.showToast({
        title: '授权失败，请重新授权',
        icon: 'none',
        duration: 2000
      })
    }
  }
})