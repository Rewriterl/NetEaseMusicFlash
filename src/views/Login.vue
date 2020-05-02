<template>
  <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
    <h3 class="loginTitle">阿里云账号登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" aria-placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" aria-placeholder="请输入密码"
                @keydown.enter.native="submitLogin"></el-input>
    </el-form-item>
    <el-button round type="primary" style="width: 100%;" @click="submitLogin">登录</el-button>
  </el-form>
</template>
<script>
  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          username: '18641580430',
          password: '1214624776ava'
        },
        rules: {
          username: [{required: true, message: "请输入用户名", trigger: "blur"}],
          password: [{required: true, message: "请输入密码", trigger: "blur"}]
        }
      }
    },
    methods: {
      submitLogin() {
        123
        this.$refs.loginForm.validate((valid) => {
            if (valid) {
              let data = JSON.stringify({
                username: this.loginForm.username,
                countrycode: "86",
                password: this.loginForm.password,
                rememberLogin: "true"
              })
              this.postRequest('https://music.163.com/weapi/login/cellphone', data).then(resp => {
                if (resp) {
                  console.log(resp)
                  // window.sessionStorage.setItem("__csrf",JSON.stringify(resp.data))
                  // this.$router.replace('/home')
                }
              })
            } else {
              this.$message.error('请输入所有字段')
              return false
            }
          }
        )
      }
    }
  }
</script>

<style>
  .loginContainer {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 15px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c9;
  }

  .loginTitle {
    margin: 15px auto 20px auto;
    text-align: center;

  }
</style>
