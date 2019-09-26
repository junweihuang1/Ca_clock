import { Base } from '../../utils/base.js';

class Statis extends Base {
  //构造函数
  constructor() {
    super();//基类构造函数
  }
  //获取统计数据
  getStatisticalSata(setyear,setmonth,callback) {
    var params = {
      url: 'getAttendanceStatistics',
      data:{
        hr_attend_startWork: setyear,
        hr_attend_knockOff: setmonth
      },
      callback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  //根据制定日期获取统计数据
  getCardDays(currentYear,currentMonth,callback) {
    var params = {
      url: 'getUserPunchDayInfo?hr_attend_startWork=' + currentYear + '&hr_attend_knockOff=' + currentMonth,
      callback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  //根据指定日期获取数据
  getAppointTime(times, callback) {
    var params = {
      url: 'getUserDatePunchInfo?hr_attend_date=' + times,
      callback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
}

export { Statis };