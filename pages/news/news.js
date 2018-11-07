// pages/news/news.js
import { News } from 'news-model.js';
var news = new News();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsOff: 0, //0为无通知，1为有
    approvalOff: 0, //0为无审批，1为有
     currentTabsIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    this._loadData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  /**
   * 切换栏 索引
   */
  onTabsItemTap:function(event){
    var index = news.getDataSet(event, 'index');
    this.setData({
      currentTabsIndex: index
    })
  },
  //跳转审批页面
  newsHandle:function(event){
    var applyID = news.getDataSet(event,'applyid');
    wx.navigateTo({
      url: '../handle/handle?applyID=' + applyID
    })
  },

  /*下拉刷新页面*/
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading();
    setTimeout(function(){
      that._loadData(() => {
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
      });
    },800);
  },

  _loadData:function(callback){
    /**
   * 获取审批消息
   */
    news.getApprovalMsg((data) => {
      if (data) {
        this.setData({
          approvalOff: 1,
          'ApprovalMsgRes': data
        })
      }
    });
    /**
   * 获取通知消息
   */
    news.getApprovalNotice((data) => {
      if (data) {
        this.setData({
          newsOff: 1,
          'ApprovalNoticeRes': data
        })
      }
    });

    callback && callback(true);
  },
  //分享效果
  onShareAppMessage: function () {
    return {
      title: '诚安打卡',
      path: 'pages/home/home'
    }
  }

})