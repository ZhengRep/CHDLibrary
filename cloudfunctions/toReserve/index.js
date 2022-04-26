const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  console.log(event)
  const _ = db.command
  if (typeof event.myData == 'string') {
    //将传入字符串转换成正常对象
    console.log(event.myData)
    event.myData = eval('(' + event.myData + ')');
  }

  const wxContext = cloud.getWXContext()
  try {
    return await db.collection(event.collection).where({
      ...event.myWhere
    }).update({
      data: {
        ...event.myData
      }
    })
  } catch (e) {
    console.log(e)
  }
}
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}

