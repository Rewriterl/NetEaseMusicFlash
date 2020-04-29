import axios from 'axios'
import {Message} from "element-ui";

// axios拦截所有请求
axios.interceptors.response.use(success => {
  if (success.status && success.status === 200 && success.data.code === 500) {
    Message.error({message: success.data.message})
    return;
  }
  if (success.data.message) {
    Message.success({message: success.data.message})
  }
  return success.data;
}, error => {
  console.log(error.response)
  if (error.response.status === 504 || error.response.status === 404) {
    Message.error({message: '没找到服务器'})
  } else if (error.response.status === 403) {
    Message.error({message: '权限不足'})
  } else if (error.status === 401) {
    Message.error({message: '请登录'})
  } else {
    if (error.response.data.message) {
      Message.error({message: error.response.data.message})
    } else {
      Message.error({message: '其他错误'})
    }
  }
  return;
});
// let base = '/api';
// 模仿网易云音乐登录数据加密
const encrypt = (data) => {

}

export const doLogin = (params) => {
  return axios({
    method: 'post',
    url: `https://music.163.com/weapi/login/cellphone`,
    data: params,
    // data默认为payLoad，需要以表单形式提交时按以下形式使用
    transformRequest: [function (data) {
      let ret = '';
      for (let i in data) {
        ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
      }
      return ret;
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
// 封装请求
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = '';
      for (let i in data) {
        ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
      }
      return ret;
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    data: params
  })
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params
  })
}
export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    data: params
  })
}
