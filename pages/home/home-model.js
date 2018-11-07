import { Base } from '../../utils/base.js';

class Home extends Base{
  //构造函数
  constructor() {
    super();//基类构造函数
  }
  //时分秒
  getNowTime() {
    var now = new Date();
    //  如果需要时分秒，就放开
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    if (h < 10) {
      h = '0' + h;
    };
    if (m < 10) {
      m = '0' + m;
    };
    if (s < 10) {
      s = '0' + s;
    };
    var formatDate = h + ':' + m + ':' + s;
    return formatDate;
  }
  //年月日
  getNowTimeYear() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if (month < 10) {
      month = '0' + month;
    };
    if (year < 10) {
      year = '0' + year;
    };
    if (day < 10) {
      day = '0' + day;
    };
    var formatDate = year + '-' + month + '-' + day;
    return formatDate;
  };
  //请求用户名
  getUser(callback){
    var params = {
      url:'User',
      type:'POST',
      callback:function(data){
        callback && callback(data);
      }
    };
    this.request(params);
  }

  //请求外出判断
  getOutgoing(callback) {
    var params = {
      url: 'goouts',
      type: 'POST',
      callback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  //请求上班打卡接口
  getCardData(address,callback){
    var params = {
      url: 'getClock',
      data:{
        address:address
      },
      type: 'POST',
      callback:function(data){
        callback && callback(data);
      }
    }
    this.request(params);
  }

  //请求下班打卡接口
  getOffCardData(address, callback) {
    var params = {
      url: 'OffWork',
      data: {
        address: address
      },
      type: 'POST',
      callback: function (data) {
        callback && callback(data);
      }
    }
    this.request(params);
  }

  //请求当天打卡记录
  getCardRecord(callback){
    var params = {
      url: 'getCard',
      callback: function (data) {
        callback && callback(data);
      }
    }
    this.request(params);
  }

  //打卡地址检测
  getAddressJudges(pois,callback){
    var params = {
      url: 'getAddress',
      type:'POST',
      data:{
        pois:pois
      },
      callback: function (data) {
        callback && callback(data);
      }
    }
    this.request(params);
  }

  //取消外出
  getGoOutCancel(id,callback){
    var params = {
      url: 'outgoing',
      type: 'POST',
      data: {
        id: id
      },
      callback: function (data) {
        callback && callback(data);
      }
    }
    this.request(params);
  }
  
}

export {Home};