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
    data: '',
    withCredentials: true,
  }).then(value => {
      console.log(value.data.recommend)
      let ids = getIdList(value.data.recommend)
      let ready;
      for (let i = 0; i < ids.length; i++) {
        let songList = getSongList(ids[i]).then(songs => {
          // console.log(songs.data.playlist.trackIds)
          let len = songs.data.playlist.trackIds.length;
          for (let j = 0; j < len; j++) {
            // 获取歌曲id
            console.log(songs.data.playlist.trackIds[j].id)
          }
        })
        // console.log(songList)
        // let len = songList.length;
        // for (let j = 0; len < 310 && j < len; j++) {
        // }
      }
    }
  )
}
// 提取歌单id列表
const getIdList = (value) => {
  let ids = [];
  let len = value.length;
  for (let j = 0; j < len; j++) {
    ids[j] = value[j].id
  }
  console.log(ids)
  return ids;
}
// 根据歌单id获取音乐列表
const getSongList = (id) => {
  return axios({
    method: 'post',
    url: `http://localhost:3000/playlist/detail?id=${id}`,
    withCredentials: true,
  })
}
