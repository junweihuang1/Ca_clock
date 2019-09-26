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
    // var params = {
    //   url:'User',
    //   type:'POST',
    //   callback:function(data){
    //     console.log(data)
    //     callback && callback(data);
    //   }
    // };
    // this.request(params);
  }

  //请求外出判断
  getOutgoing(callback) {
    var params = {
      url: 'getFieldPersonnelList',
      data:{
        pageSize:"1",
        limit:"5"
      },
      callback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  //请求上班打卡接口
  getCardData(address,callback){
    var params = {
      url: 'goWorkPuch',
      data:{
        hr_attend_workAddress:address,
        hr_attend_workIp:'192.168.11.112'
      },
      type: 'POST',
      callback:function(data){
        callback && callback(true);
      }
    }
    this.request(params);
  }

  //请求下班打卡接口
  getOffCardData(address, callback) {
    var params = {
      url: 'goAfterWorkPuch',
      data: {
        hr_attend_offWorkAddress:address,
        hr_attend_underIp:'192.168.11.112'
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
      url: 'getCurDayPunchInfo',
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
      url: 'endOutWorkActive',
      type: 'POST',
      data: {
        field_personnel_id: id
      },
      callback: function (data) {
        callback && callback(data);
      }
    }
    this.request(params);
  }

  getJavaAddress(data, callback){
    var params = {
      url: 'verifyPunchAddress',
      type: 'POST',
      data: data,
      callback: function (data) {
        callback && callback(data);
      }
    }
    this.request(params);
    // wx.request({
    //   url: 'https://www.casdapi.com/casd2/admin/verifyPunchAddress',
    //   data: data,
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   method:'POST',
    //   success:(res)=>{
    //     callback && callback(res.data)
    //   },
    //   fail:err=>{
    //     callback && callback(data)
    //     wx.showToast({
    //       title: '服务器内部错误,请联系技术员',
    //       icon:'none'
    //     })
    //   }
    // })
  }

  
}

export {Home};