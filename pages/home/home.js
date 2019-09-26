// pages/home/home.js
import { Home } from 'home-model.js';
var QQMapWX = require('../../qqmap/qqmap-wx-jssdk.js');
var AmapFile = require('../../utils/amap-wx.js');
import { Token } from '../../utils/token.js';
var home = new Home();
var qqmapsdk = new QQMapWX({
  key: 'TVVBZ-SNEWW-ZN4RD-OMA43-HMO7O-U4BIN'
});
var myAmapFun = new AmapFile.AMapWX({ 
  key:'e9d0a4648b507b32c3c383e5139834fc' 
});
var login = new Token();
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
   username:'游客',
   address:'',
   cardOff:1,//1为上班打卡，2为下班打卡,3为今日已打卡
   state:false,//true为有记录数据，false为没有记录数据
   control:0,//0只显示上班打卡，1为显示上班和下班
   loadingHidden: false,
   outgoingState:false, //true为有外出
   accuracyResult:false,//位置精度
   personnel_id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    const token = wx.getStorageSync('token')
    if(token){
      that.getAddres(res => {
        that.setData({
          loadingHidden: true
        })
      });
    }
    wx.getSystemInfo({
      success:function(res){
       // console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setInterval(function () {
      this.setData({
        time: home.getNowTime(),
        year: home.getNowTimeYear()
      });
    }.bind(this), 1000)
    //定时刷新地址
    setInterval(function () {
      this.getAddres();
    }.bind(this), 300000)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //this._loadData();
    this.setData({
      username:wx.getStorageSync('username')
    })
    this.getCard()
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },
  /*下拉刷新页面*/
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading();
    that.getCard(() => {
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    })
  },
  _loadData: function () {
    //获取用户名
    // home.getUser((data)=>{
    //   console.log(data)
    //   if(data.user){
    //     this.setData({
    //       'username': data.user
    //     })
    //   }
    // })
    //判断是否是外出
    // home.getOutgoing((data) => {
    //   if (data.field_personnel_id) {
    //     this.setData({
    //       'outgoingId': data.field_personnel_id,
    //       outgoingState: true
    //     })
    //   } else {
    //     return false;
    //   }
    // })
    
  },
  //打卡
  onDetailCard:function(){
    var that = this;
    
    var formIds = app.globalData.gloabalFomIds;
    var accuracyResult = this.data.accuracyResult;
    wx.showModal({
      title: '确定打卡吗?',
      content: '当前位置是：' + ' ' + that.data.address,
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '数据提交中',
            mask: true,
            success: function () {
              //发送formid到服务器存放
             // home.sendFormId(formIds, (res) => {
                //为true时继续执行
                if(res){
                  app.globalData.gloabalFomIds = [];//清空全局数组
                    //验证位置精度是否为true
                    if (accuracyResult == true) {
                      if (that.data.cardOff == 1) {
                        //正确就发起打卡请求
                        home.getCardData(that.data.address, (data) => {
                          wx.hideLoading();
                          if(data.error){
                            that.errorTips('打卡失败，没找到所在项目或班组');
                            return;
                          }
                          if (data == true) {
                            wx.showToast({
                              title: '打卡成功',
                              icon: 'success',
                              duration: 1000,
                              success: function () {
                                that.getCard();
                                //推送一条上班打卡成功消息
                                // home.sendMssage(3, that.data.address, (res) => {
                                //   return true;
                                // });
                              }
                            })
                          } else {
                            that.errorTips('打卡失败，网络繁忙');
                          }
                        });
                      } else {
                        //发起下班打卡请求
                        home.getOffCardData(that.data.address, (data) => {
                          if (data) {
                            wx.hideLoading();
                            wx.showToast({
                              title: '打卡成功',
                              icon: 'success',
                              duration: 1000,
                              success: function () {
                                that.getCard();
                                //推送一条下班打卡成功消息
                                // home.sendMssage(4, that.data.address, (res) => {
                                //   return;
                                // });
                              }
                            })


                          } else {
                            that.errorTips('未到下班打卡时间不能打卡');
                          }
                        })
                      }
                    } else {
                      that.errorTips('打卡失败，地址不在范围内！请更新当前位置~~');
                    }
                }else{
                  that.errorTips('打卡失败，网络繁忙!请稍后重试~~');
                }
             // });
            }
          })
        }
      }
    })
  },
  //获取用户地址
  getAddres: function (callback) {
    var that = this;
    //获取前判断是否授权
    wx.getSetting({
      success: function (res) {
        var result = res.authSetting['scope.userLocation'];
        
        if (!result) {
          wx.redirectTo({
            url: '../popup/popup'
          })
          return false;
        }
        wx.getLocation({
          type: 'gcj02',
          success: function (res) {
            //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
            myAmapFun.getRegeo({
              // location: res.longitude + "," + res.latitude,  
              location: '113.326193,23.078449',
              success: function (data) {
                console.log(data)
                var address = data[0].regeocodeData.formatted_address ? data[0].regeocodeData.formatted_address:'请打开GPS定位服务'
                var location = data[0].longitude + ',' + data[0].latitude
                home.getJavaAddress({
                  'coordinate': location,
                  // 'coordinate': '113.326155,23.078593',
                  'userId': wx.getStorageSync('uid')
                }, data => {
                  callback && callback(true)
                  if (data.code == 10005) {
                    that.setData({
                      address: address,
                      accuracyResult: false,
                      distance: data.distance,
                      range:data.range
                    })
                  } else if(data.errorCode == 10008){
                    that.data.personnel_id=data.msg.split("-")[1]
                    that.setData({
                      address: address,
                      outgoingState: true,
                      distance: data.distance,
                      range: data.range
                    })
                  } else if (data.code == 20000) {
                    that.setData({
                      address: address,
                      accuracyResult: true,
                      distance: data.distance,
                      range: data.range
                    })
                  }                  
                })
              },
              fail: function (info) {
                //失败回调
                console.log(info)
              }
            })
            // qqmapsdk.reverseGeocoder({
            //   coord_type: 5,
            //   location: {
            //     //latitude: res.latitude,
            //     //longitude: res.longitude
            //     latitude: '22.085578',
            //     longitude: '113.372033'
            //   },
            //   get_poi:1,
            //   success: function (addressRes) {
            //     console.log(addressRes)
            //     var address =addressRes.result.formatted_addresses.recommend;
            //     home.getJavaAddress({
            //       //'coordinate': res.longitude + ',' + res.latitude,
            //       'coordinate': '113.372033,22.085578',
            //       'userId': wx.getStorageSync('uid')
            //     }, data => {
            //       callback && callback(true)
            //       if (data.errorCode == 10005) {
            //         that.setData({
            //           address: address,
            //           accuracyResult: false
            //         })
            //       } else if (data.code == 20000) {
            //         that.setData({
            //           address: address,
            //           accuracyResult: true
            //         })
            //       }                  
            //     })
            //   }
            // })
          },

        })
      }
    })
  },
  //获取用户当天的打卡记录 //
  getCard:function(callback){
    home.getCardRecord((res) => {
      if (res.data) {
        this.setData({
          state: true,
          control: res.data.hr_attend_control,
          'cardRecord': res.data
        })
        if (res.data.hr_attend_startWork){
          if (res.data.hr_attend_knockOff){
            this.setData({
              cardOff: 3
            })
          }else{
            this.setData({
              cardOff: 2
            })
          }
        }
        callback && callback(true);
      } else {
        this.setData({
          cardOff: 1,
          state: false
        })
        callback && callback(false);
      }
    });
  },
  //更新定位
  updatePosition:function(){
    var that = this;
    wx.showLoading({
      title: '更新中...',
      mask: true,
      success: function() {
        that.getAddres((res)=>{
          wx.hideLoading();
          wx.showToast({
            mask:true,
            title:'更新成功',
            duration:1000
          })
        });
      },
    })
  },
  //已打卡点击
  onTips:function(){
    wx.showModal({
      title: '操作提示',
      content: '您今天已成功打卡，请不要再点了！',
      showCancel: false
    })
  },
  //外出提示
  onTipsGoOut:function(){
    wx.showModal({
      title: '操作提示',
      content: '打卡失败！您当前正在外出中，请先取消外出！',
      showCancel: false
    })
  },
  //取消外出
  onAddCardData:function(){
    var that = this;
    var id = that.data.personnel_id
    wx.showModal({
      title: '操作提示',
      content: '您确定要取消外出吗？',
      success:function(res){
        if (res.confirm){
          wx.showLoading({
            title: '数据提交中',
            mask:true,
            success:function(){
              home.getGoOutCancel(id, (data) => {
                if (data.code=="20000") {
                  wx.hideLoading();
                  wx.showToast({
                    title: '取消成功！',
                    icon: 'success',
                    duration: 1000,
                    success: function () {
                      that.getCard()
                      that.setData({
                        outgoingState:false
                      });
                    }
                  })
                }else{
                  wx.hideLoading();
                  that.errorTips('网络繁忙，请稍后再试！');
                }
              });
            }
          })
        }
      }
    })
  },
  //分享效果
  onShareAppMessage: function () {
    return {
      title: '诚安打卡',
      path: 'pages/home/home'
    }
  },
  //获取from ID
  formSubmit: function (e) {
    home.dealFormIds(e.detail.formId);
    return true;
  },

  //错误提示
  errorTips:function(title){
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 1500,
      mask: true
    })
  }
})

