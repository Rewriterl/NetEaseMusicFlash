// 关注与取消关注用户

module.exports = (query, request) => {
  query.cookie.os = 'pc'
  query.t = 'follow'
  return request(
    'POST', `https://music.163.com/weapi/user/${query.t}/${query.id}`, {},
    {crypto: 'weapi', cookie: query.cookie, proxy: query.proxy}
  )
}
