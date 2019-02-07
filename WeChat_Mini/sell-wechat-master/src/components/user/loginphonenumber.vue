<template>
  <div class="login-phonenumber">
    <v-topbar :title="topbar.title" @back="topBack" :is_arrow_show="topbar.is_arrow_show" :right_text="topbar.right_text" @switchLoginModel="goPasswordModel"></v-topbar>
    <div class="login-content" style="padding-top:55px;">
      <div class="mobile-box">
        <input type="number" placeholder="手机号" @input="maxLength" v-model="phonenumber">
        <span class="send-code" :class="{active:code_btn_can_click}" @click="sendCode">{{code_text}}</span>
      </div>
      <div class="code">
        <input type="number" placeholder="验证码" v-model="code" @input="codeMaxLength">
      </div>
      <div class="tip">
        温馨提示:未注册小迪外卖账号的手机，登录时将自动注且，代表您已同意<a @click="userService" class="user-service">《用户服务协议》</a>
      </div>
      <div style="width:100%;padding:0 10px;box-sizing:border-box;">
        <button type="button" class="login-btn" @click="login">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
  import topbar from '../header/header-top-bar'
  import router from '../../router'
  import qs from 'qs'
  import axios from 'axios'

  export default {
    name: 'loginphonenumber',
    data() {
      return {
        topbar: {
          title: '手机登录',
          is_arrow_show: true,
          right_text: '密码登录'
        },
        phonenumber: '',
        code: '',
        code_text: '发送验证码',
        code_btn_can_click: false
      };
    },
    components: {
      'v-topbar': topbar
    },
    methods: {
      topBack: function () {
        router.go(-1);
      },
      maxLength: function () {
        if (this.phonenumber.length >= 11) {
          this.phonenumber = this.phonenumber.slice(0, 11);
          this.code_btn_can_click = true;
        }
      },
      codeMaxLength: function () {
        if (this.code.length > 6) {
          this.code = this.code.slice(0, 6);
        }
      },
      sendCode: function () {
        var self = this;
        if (this.code_btn_can_click) {
          if (this.checkPhoneNumber()) {
            let data = qs.stringify({phonenumber: this.phonenumber});
            axios.post('/user/sendcode', data).then(function (response) {
              if (response.data.success == 0) {
                var count = 60;
                self.code_btn_can_click = false;
                self.code_text = '已发送（' + count + 's）';
                let timer = setInterval(function () {
                  count--;
                  self.code_text = '已发送（' + count + 's）';
                  if (count == 0) {
                    clearInterval(timer);
                    self.code_text = '重新发送';
                    self.code_btn_can_click = true;
                  }
                }, 1000);
              }
              else{
                alert('验证码发送失败，请确认手机号重新发送');
                self.code_text = '重新发送';
              }
            });
          } else {
            alert('手机号格式有误，请检查！');
          }
        }
      },
      userService: function () {
        alert('用户协议');
      },
      checkPhoneNumber: function () {
        if (/^1[3|4|5|7|8][0-9]{9}$/.test(this.phonenumber)) {
          return true;
        } else {
          return false;
        }
      },
      login: function () {
        let phonenumber = this.phonenumber;
        let code = this.code;
        let data = qs.stringify({
          phonenumber: phonenumber,
          code: code
        });
        axios.post('/user/signinphonenumber', data).then(function (response) {
          if (response.data.success == 0) {
            router.go(-1);
          } else {
            alert('失败');
          }
        });
      },
      goPasswordModel: function () {
        router.replace('/user/loginpassword');
      }
    }
  }

</script>
<style>
  .login-phonenumber {
    background-color: #f5f5f5;
    height: 100%;
  }

  .login-content input {
    padding: 0 10px;
    width: 100%;
    height: 40px;
    border: none;
    font-size: 14px;
    outline: none;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .mobile-box {
    position: relative;
  }

  .mobile-box input {
    border-bottom: none;
  }

  .mobile-box .send-code {
    position: absolute;
    right: 10px;
    display: inline-block;
    height: 34px;
    background: #cccccc;
    line-height: 34px;
    font-size: 14px;
    width: 100px;
    text-align: center;
    color: #fff;
    top: 50%;
    border-radius: 4px;
    transform: translateY(-50%);
  }

  .mobile-box .send-code.active {
    background-color: #0097ff;
  }

  .tip {
    color: #9b9b9b;
    font-size: 10px;
    padding: 10px;
    line-height: 14px;
  }

  .login-btn {
    height: 40px;
    border: none;
    width: 100%;
    background: #4cd964;
    font-size: 16px;
    color: #fff;
    box-sizing: border-box;
    display: block;
    border-radius: 4px;
    outline: none;
  }

  .user-service {
    color: #4b9dea;
  }

</style>
