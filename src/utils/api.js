import axios from 'axios'
import {Message} from 'element-ui';
// import CryptoJS from 'crypto-js'
import crypto from "crypto"
import qs from 'qs'

// 方法a生成随机16位字符串
const secretKey = "aeYfpx2rJgJIi9WY";
// 常量参数e
const publicKey = "010001";
// 参数f
const modulus = "00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7"
// 常量参数g
const nonce = "0CoJUm6Qyw8W8jud";
// aes加密偏移量,常量
const iv = "0102030405060708";
const pubKey = [
  '-----BEGIN RSA PUBLIC KEY-----',
  'MIGJAoGBAOC1CfYlnfhkLbw1ZikBR33yJnfsFStf9orOYVu3tyUVKzqxeodq6opa',
  'p20uQXYp7E7jQfVhNfzPaVKAEE4DEuy9qSVXyThwEUr2ydBcT38MNoW3pGvuJVky',
  'V1zOELQk2BPP5IddPoIEe5fd71J0HVRrjiidxpNbPs4EYtsKIrjnAgMBAAE=',
  '-----END RSA PUBLIC KEY-----'
].join('\n');
// const encSecKey = "d6eb37dde9d269e06b8a62f050d71df527e24d3153b7e8d87a54a2449b4370ee55129d6c58e3d49c7cc98972fe340e9a5c8f5c598fb0068708adde10f58a6110a8919fcb844673d73e7ce1350df6a85e10a9c1b6d391eebbcaaea757f4a88fd708929c1bf0d7b792658e525ab5c0f77d9a8432b941130c0d2e114d3f081b7103";
// 用户浏览器信息
const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36";
const referer = "http://music.163.com/"
// 数据加密方法
const aes = (data) => {
  // return CryptoJS.AES.encrypt(data, secretKey, {iv: iv, mode: CryptoJS.mode.CBC}).ciphertext.toString()
  const cipher = crypto.createCipheriv('aes-128-cbc', nonce, iv)
  return cipher.update(data, 'utf8', 'base64') + cipher.final('base64')
}

const rsa = (data) => {
  return crypto.publicEncrypt({
    key: pubKey,
    padding: crypto.constants.RSA_NO_PADDING
  }, data).toString('hex')
}

// 进行加密
const prepare = (data) => {
  let formData = {params: "", encSecKey: ""};
  formData.params = aes(data);
  formData.params = aes(formData['params']);
  formData.encSecKey = rsa(Buffer.from(secretKey.padStart(123, '\0')));
  console.log(formData)
  return formData;
}

// 封装请求
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${url}`,
    data: prepare(params),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'referer': referer,
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.30',
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
