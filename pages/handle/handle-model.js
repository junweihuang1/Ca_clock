import { Base } from '../../utils/base.js';

class Handle extends Base {
  //构造函数
  constructor() {
    super();//基类构造函数
  }

  //请求当前审批数据

  getApplyData(applyID,callback){
    var params = {
      url: 'getApply/' + applyID,
      callback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  //审批
  toExamine(applyID,status,callback) {
    var params = {
      url: 'approval',
      type:'post',
      data: {
        applyId: applyID,
        status: status
      },
      type: 'POST',
      callback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }


}

export { Handle };