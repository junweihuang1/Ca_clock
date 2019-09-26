// pages/handle/handle.js
import { Handle } from 'handle-model.js';
var handle = new Handle();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var applyID = options.applyID;
    this.applyData(applyID);
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

  //获取当前审批内容
  applyData: function (applyID){
    handle.getApplyData(applyID,(data)=>{
      this.setData({
        'applyContent':data.data
      });
    });
  },

  //同意审批
  approval: function (event){
    var that = this;
    var applyID = handle.getDataSet(event,'applyid');
    var status  = handle.getDataSet(event,'status');
    wx.showLoading({
      title: '数据提交中',
      mask:true,
      success:function(){
        handle.toExamine(applyID, status, (data) => {
          if(data){
            if(data.error){
              wx.hideLoading();
              wx.showToast({
                title: data.error,
                icon: 'none',
                mask: true,
                duration: 1500
              })
              return;
            }
            wx.hideLoading();
            wx.showToast({
              title: '审批成功',
              icon: 'success',
              mask: true,
              duration: 1500,
              success:function(){
                wx.navigateBack({
                  delta: 2
                })
              }
            })
          }else{
            wx.hideLoading();
            wx.showToast({
              title: '网络繁忙，请重试',
              icon: 'none',
              mask:true,
              duration: 1500
            })
          }
        })
      }
    });
  }
})