import { Base } from '../../utils/base.js';

class Handle extends Base {
  //构造函数
  constructor() {
    super();//基类构造函数
  }

  //请求当前审批数据

  getApplyData(applyID,callback){
    var params = {
      url: 'getAssingnationAttendApply?hr_attend_apply_id=' + applyID,
      callback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  //审批
  toExamine(applyID,status,callback) {
    if(status=="3"){
      var url ="agreeAttendApply"
    }else if(status=="2"){
      var url ="rejectAttendApply"
    }
      var params = {
        url: url,
        type: 'post',
        data: {
          hr_attend_apply_id: applyID
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