// 操作记录

module.exports = (query, request) => {
  let data = {
    'logs': JSON.stringify([{
      'action': 'play',
      'json': {
        "type": "song",
        "wifi": 0,
        "download": 0,
        "id": 527566,
        "time": 600,
        "end": "playend",
        "sourceId": ""
      }
    }])
  }
  console.log(data)
  return request(
    'POST', `https://music.163.com/weapi/feedback/weblog`, data,
    {crypto: 'weapi', cookie: query.cookie, proxy: query.proxy}
  )
}
