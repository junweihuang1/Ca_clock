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
    },
    isRuleTrue:false
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
        that.getDayRes(that.data.dateRes.fullYear, that.data.dateRes.month);
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
  //关闭
  hideRule: function () {
    this.setData({
      isRuleTrue: false
    })
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
  //监听点击日历具体某一天的事件
  dayClick: function (event) {
    var data = event.detail;
    var that = this;
    if (data.day<10){
      data.day = '0' + data.day;
    }
    var times = data.year + '-' + data.month + '-' + data.day;
    wx.showLoading({
      title: '加载中...',
      mask: true,
      success: ()=>{
        statis.getAppointTime(times, (res) => {
          if(!res){
            wx.showModal({
              title: '操作提示',
              content: '当日没有打卡记录',
              showCancel:false
            })
            wx.hideLoading();
            return;
          }
          that.setData({
            startWork: res.hr_attend_startWork,
            knockOff: res.hr_attend_knockOff
          });
          wx.hideLoading();
          this.setData({
            isRuleTrue: true
          })
        });
      }
    })
  },
  //监听点击日历标题日期选择器事件
  dateChange:function(event){
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
      title: '加载中...',
      mask:true,
      success:function(){
        statis.getCardDays(currentYear, currentMonth, (res) => {
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