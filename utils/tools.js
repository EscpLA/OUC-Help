// 帖子发布的日期
function postDate() {
  if (this.postInfo.time != undefined) {
    return this.postInfo.post_time.split('T')[0]
  }
};
// 贴子发布的时间
function postClock() {
  if (this.postInfo.time != undefined) {
    // 2022-08-05T08:08:53.450Z
    // 使用 howmany 参数，返回前几个。
    let clock = this.postInfo.post_time.split('T')[1];
    return clock.split(':', 2).join(":");
  }
};

// 贴子丢失拾到，需要经过如下函数转换后，才能正常显示
// 因为 苹果不支持 - 只支持 /
function formatTime(date) {

  var time = date == null ? "" : Date.parse(date.replace(/-/g, '/'));

  var date = new Date(time);

  var year = date.getFullYear();

  var month = date.getMonth() + 1;

  if (month < 10) {

    month = '0' + month;

  }

  var day = date.getDate();

  if (day < 10) {

    day = '0' + day;

  }

  // var hour = date.getHours();

  // if (hour < 10) {

  //   hour = '0' + hour;

  // }

  // var minute = date.getMinutes();

  // if (minute < 10) {

  //   minute = '0' + minute;

  // }

  // var second = date.getSeconds();

  // if (second < 10) {

  //   second = '0' + second;

  // }

  // return [year, month, day + ' ' + hour + ':' + minute + ':' + second].map(formatNumber).join('/');
  return [year, month, day].map(formatNumber).join('/');

};

// itemTime，物品的丢失或拾到时间
function itemTime(time) {
  let arr = time.split('-');
  arr[2] = arr[2].split('T')[0];
  // console.log('arr:', arr);
  return arr[0] + '-' + arr[1] + '-' + arr[2];
};

// utc事件转北京时间
function utcToBeijing(utcTime) {
  // console.log("utc时间转换");
  // 初步处理
  let newTime = utcTime.split('T')[0] + " " + utcTime.split('T')[1].split('.')[0];
  // 处理成为时间戳
  let timeStamp = new Date(newTime.replace(/-/g, '/')).getTime();
  // console.log('timeStamp', timeStamp);
  // 转化成秒
  timeStamp = timeStamp / 1000;

  // 增加八个时区，北京时间比utc多八个时区
  timeStamp = timeStamp + 8 * 60 * 60;
  // 时间戳转为时间
  let date = new Date(parseInt(timeStamp) * 1000);
  // console.log('date', date);
  let YY = date.getFullYear() + '-';
  let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return (YY + MM + DD + " " + hh + mm + ss);
}

// 返回当天时间 'xxxx年-xx月-xx日'
function nowDate() {
  // 获取当日时间，用于时间选取
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let date = d.getDate();
  return year + '-' + month + '-' + date;
}

export default {
  postDate,
  postClock,
  itemTime,
  utcToBeijing,
  nowDate,
  formatTime
}
