// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  await cloud.openapi.customerServiceMessage.send({
    touser: wxContext.OPENID,
    msgtype: 'text',
    text: {
      content: '你好，我是可爱的长图小布克，请问有什么可以帮助你的吗？请把你的问题全部列出，我们收到后会第一时间给你答复。'
    }
  });

  return 'success';
};