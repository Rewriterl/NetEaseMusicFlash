// 手机登录

const crypto = require('crypto')

module.exports = (query, request) => {
  query.cookie.os = 'pc'
  const data = {
    phone: query.phone,
    countrycode: query.countrycode,
    password: query.password,
    rememberLogin: 'true'
  }
  return request(
    'POST', `https://music.163.com/weapi/login/cellphone`, data,
    {crypto: 'weapi', ua: 'pc', cookie: query.cookie, proxy: query.proxy}
  )
}
