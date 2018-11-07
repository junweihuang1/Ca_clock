// pages/statis/statis.js
import { Token } from '../../utils/token.js';
import { Statis } from 'statis-model.js';
var statis = new Statis();
var login = new Token();
var date = new Date();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dayStyle: [
    ],
    dateRes:{
      fullYear: date.getFullYear(),
      month: date.getMonth() + 1
    }
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
    this.getStatis();
    this.getDayRes(this.data.dateRes.fullYear, this.data.dateRes.month);
    //时刻监听登录状态
    // wx.getStorage({
    //   key: 'token',
    //   success: function (res) {
    //     if (res.data) {
    //       login.veirfyFromServer(res.data);
    //     }
    //   }
    // })
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
   * 页面下拉
   */
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading();
    setTimeout(function () {
      that.getStatis(() => {
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
      });
    }, 800);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //点击跳转补卡申请页面
  supplementCard:function(){
    wx.navigateTo({
      url: '../repair/repair'
    })
  },
  //分享效果
  onShareAppMessage: function () {
    return {
      title: '诚安打卡',
      path: 'pages/home/home'
    }
  },
  //请求统计数据
  getStatis:function(callback){
    statis.getStatisticalSata((data)=>{
      this.setData({
        'statisData':data
      })
    });

    callback && callback(true);
  },
  //下一页
  next:function (event) {
    var currentYear = event.detail.currentYear,
      currentMonth = event.detail.currentMonth;
    this.setData({
      dateRes:{
        fullYear:currentYear,
        month:currentMonth
      }
    });

    this.getDayRes(currentYear, currentMonth);
  },

  //上一页
  prev:function (event) {
    var currentYear = event.detail.currentYear,
      currentMonth = event.detail.currentMonth;
    this.setData({
      dateRes: {
        fullYear: currentYear,
        month: currentMonth
      }
    });

    this.getDayRes(currentYear, currentMonth);
  },
 
  //获取天数
  getDayRes: function (currentYear, currentMonth){
    var dayStyle = this.data.dayStyle,
      that = this;
    wx.showLoading({
      title: '',
      mask:true,
      success:function(){
        statis.getgetCardDays(currentYear, currentMonth, (res) => {
          if (res) {
            dayStyle = [];
            if (res.normalData) {
              for (let i = 0; i < res.normalData.length; i++) {
                dayStyle.push(
                  { month: 'current', day: res.normalData[i], color: 'white', background: '#0190a0' }
                );
              }
            }
            if (res.abnormalData) {
              for (let i = 0; i < res.abnormalData.length; i++) {
                dayStyle.push(
                  { month: 'current', day: res.abnormalData[i], color: 'white', background: 'red' }
                );
              }
            }
          } else {
            dayStyle = [];
          }

          that.setData({
            dayStyle: dayStyle
          });
          wx.hideLoading();
        })
      }
    })
  }


})