/**
 * 小程序配置文件
 */

const host = '14592619.qcloud.la'

const config = {
  // 测试的请求地址，用于测试会话
  requestUrl: '',
  host,

  // 云开发环境 ID
  envId: 'cloud1-4ggmc6wo7b1e8647',

  env:"server",
  api_build: "https://yiban.chd.edu.cn/api/miniapp",
  api_buildEx: "https://yiban.chd.edu.cn/api/library",
  api_dev: {
    server: "https://yiban.chd.edu.cn/api/miniapp",
    serverEX:"https://yiban.chd.edu.cn/api/library"
  },
  qrcode_genarate_url:""
}

module.exports = config

