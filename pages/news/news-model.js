import { Base } from '../../utils/base.js'; 

class News extends Base{
  //构造函数
  constructor() {
    super();//基类构造函数
  }

  //获取审批消息
  getApprovalMsg(callback){
    var params = {
      url: 'getUnreviewedAttendApply',
      callback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  //获取通知
  getApprovalNotice(callback) {
    var params = {
      url: 'getCurAttendApplyInfo',
      callback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
}

export { News };