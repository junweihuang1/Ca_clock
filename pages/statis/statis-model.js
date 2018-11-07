import { Base } from '../../utils/base.js';

class Statis extends Base {
  //构造函数
  constructor() {
    super();//基类构造函数
  }
  //获取统计数据
  getStatisticalSata(callback) {
    var params = {
      url: 'statistics',
      callback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  //根据制定日期获取统计数据
  getgetCardDays(currentYear,currentMonth,callback) {
    var params = {
      url: 'getCardDays'+'?currentYear=' + currentYear + '&currentMonth=' + currentMonth,
      callback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }


}

export { Statis };