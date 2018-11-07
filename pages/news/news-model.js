import { Base } from '../../utils/base.js'; 

class News extends Base{
  //构造函数
  constructor() {
    super();//基类构造函数
  }

  //获取审批消息
  getApprovalMsg(callback){
    var params = {
      url: 'getMsg',
      callback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  //获取通知
  getApprovalNotice(callback) {
    var params = {
      url: 'getNotice',
      callback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }


}

export { News };