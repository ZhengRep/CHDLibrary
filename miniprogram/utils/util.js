const formatTime = (date,type) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  
  let timeStr = ''
  switch(type){
    case 'YYYY-MM-DD':
      timeStr = [year, month, day].map(formatNumber).join('-')
      break
    case 'hh:mm':
      timeStr = [hour, minute].map(formatNumber).join(':')
      break
    default:
      timeStr = [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
      break
  }
  return timeStr
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//判断是否为纯粹对象
function isPlainObject(obj) {
  if (!obj || obj.toString() !== "[object Object]" || obj.nodeType || obj.setInterval) {
    return false;
  }
  if (obj.constructor && !obj.hasOwnProperty("constructor") && !obj.constructor.prototype.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  for (var key in obj) { }
  return key === undefined || obj.hasOwnProperty(key);
}
function cloneObj(obj) {
  if (!isPlainObject(obj)) { return false; }
  return JSON.parse(JSON.stringify(obj));
}

//md5&base64
const md5 = require('./md5.min.js'), base64 = require('./base64.min.js'),
  sign = function (data) {
    var _data = cloneObj(data);
    _data['\x74\x6f\x6b\x65\x6e'] = base64.decode(getApp()['\x5f\x74']);
    return md5(JSON.stringify(_data));
  },
  key = function (data) {
    if (!isPlainObject(data)) { return false; }
    data.timestamp = parseInt(new Date().getTime().toString().substr(0, 10));

    data.sign = sign(data);

    return {
      key: base64.encode(JSON.stringify(data))
    };
  }
module.exports = {
  formatTime: formatTime,
  md5: md5,
  base64: base64,
  key: key
}
