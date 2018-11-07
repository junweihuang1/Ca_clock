// pages/repair/repair.js
import { Home } from '../home/home-model.js';
import {Repair} from 'repair-model.js';
var home = new Home();
var repair = new Repair();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '全天', value: '全天', checked:true },
      { name: '上班', value: '上班' },
      { name: '下班', value: '下班'}
    ],
    checkedValue:'全天',
    contentText:'',
    date: home.getNowTimeYear(),
    loading: false,
    disabled: false
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
    
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  //监听补卡类型选中
  radioChange: function (e) {
    this.setData({
      checkedValue: e.detail.value
    })
  },
  //监听文本输入内容
  coontentText:function(e){
    this.setData({
      contentText: e.detail.value
    })
  },
  //监听时间选择
  bindDateChange:function(e){
    this.setData({
      date:e.detail.value
    })
  },

  //提交
  submit:function(){
    var that = this,
      checkedValue = that.data.checkedValue,
      contentText = that.data.contentText,
      date = that.data.date;
    if (!contentText){
      wx.showToast({
        title: '补卡内容不能为空',
        icon: 'none',
        mask: true,
        duration: 1000
      })
    }else{
      wx.showLoading({
        title: '数据提交中...',
        mask: true,
        success: function () {
          repair.PostSupplementCard(checkedValue,date,contentText,(data)=>{
            console.log(data);
           if(data){
             wx.hideLoading();
             wx.showModal({
               title: '操作提示',
               content: '申请成功',
               showCancel: false,
               success: function() {
                wx.switchTab({
                  url: '../statis/statis'
                })
               }
             })
            }else{
             wx.hideLoading();
             return;
            }
          });
        }
      })
    }
  }
})