import axios from 'axios'

const crypto = require('crypto')

export const login = (phone, password) => {
  return axios({
    method: 'post',
    url: `http://localhost:3000/login/cellphone?phone=${phone}&password=${crypto.createHash('md5').update(password).digest('hex')}`,
    withCredentials: true,
  })
}
export const rush = () => {
  // 1.拿歌单列表
  return axios({
    method: 'post',
    url: `http://localhost:3000/recommend/resource`,
    withCredentials: true,
  })
}
// 提取歌单id列表
export const getIdList = (value) => {
  let ids = [];
  let len = value.length;
  for (let j = 0; j < len; j++) {
    ids[j] = value[j].id
  }
  return ids;
}
// 根据歌单id获取音乐列表
export const getSongList = (id) => {
  return axios({
    method: 'post',
    url: `http://localhost:3000/playlist/detail?id=${id}`,
    withCredentials: true,
  })
}
export const doRush = (id) => {
  return axios({
    method: 'post',
    url: `http://localhost:3000/weapi/feedback/weblog?id=${id}`,
    withCredentials: true,
  })
}
