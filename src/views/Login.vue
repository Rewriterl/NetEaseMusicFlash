<template>
  <div v-if="flag">
    <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
      <h3 class="loginTitle">阿里云账号登录</h3>
      <el-form-item prop="phone">
        <el-input type="text" v-model="loginForm.phone" auto-complete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"
                  @keydown.enter.native="submitLogin"></el-input>
      </el-form-item>
      <el-button round type="primary" style="width: 100%;" @click="submitLogin">登录</el-button>
    </el-form>
  </div>
  <div v-else class="loginContainer" style="text-align: center">
    <el-button type="primary" round @click="submitRush">开始刷播放量</el-button>
    <div>
      <el-table
        :data="tableData"
        height="250"
        border
        style="width: 100%">
        <el-table-column
          prop="num"
          label="已刷"
          width="180">
        </el-table-column>
        <el-table-column
          prop="id"
          label="歌曲id">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import Vue from "vue";

  export default {
    name: "Login",
    data() {
      return {
        tableData: [],
        flag: true,
        loginForm: {
          phone: '',
          password: ''
        },
        rules: {
          phone: [{required: true, message: "请输入用户名", trigger: "blur"}],
          password: [{required: true, message: "请输入密码", trigger: "blur"}]
        }
      }
    },
    methods: {
      submitLogin() {
        this.$refs.loginForm.validate((valid) => {
            if (valid) {
              this.login(this.loginForm.phone, this.loginForm.password)
                .then(value => {
                  if (value.data.code === 200) {
                    this.flag = false
                    this.$message({
                      showClose: true,
                      message: "登录成功",
                      type: 'success'
                    })
                  } else if (value.data.code === 502) {
                    this.$message({
                      showClose: true,
                      message: value.data.msg,
                      type: 'error'
                    })
                  }
                })
            } else {
              this.$message.error('请输入所有字段')
              return false
            }
          }
        )
      },
      submitRush() {
        this.rush().then(value => {
            // 推荐专辑列表
            let ids = this.getIdList(value.data.recommend)
            // 通知
            let message;
            // 已经刷过的索引
            let usedListId = Vue.prototype.usedListId
            let ll = usedListId.length;
            let listId = 0
            if (ids.length !== ll) {
              while (usedListId.indexOf(listId) !== -1) {
                listId = Math.floor((Math.random() * ids.length))
              }
              message = `歌单:${ids[listId]}刷完啦`;
              usedListId.push(listId)
            } else {
              message = "今天的所有歌单都已经刷完了哦"
            }
            Vue.prototype.usedListId = usedListId
            // 歌单id
            let sourceid = ids[listId]
            this.getSongList(sourceid).then(songs => {
              let len = songs.data.playlist.trackIds.length;
              // 获取歌单内全部歌曲id
              for (let j = 0; j < len; j++) {
                this.tableData.push({
                  num: j,
                  id: songs.data.playlist.id,
                })
                this.doRush(songs.data.playlist.trackIds[j].id, sourceid)
                if (j === 300) {
                  break;
                }
              }
            })
            this.$notify({
              title: '通知',
              message: message,
              type: 'success'
            });
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
