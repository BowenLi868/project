<template>
  <div class="login-password">
    <v-topbar :title="topbar.title" @back="topBack" :is_arrow_show="topbar.is_arrow_show" :right_text="topbar.right_text"></v-topbar>
    <div class="login-content" style="padding-top:55px;">
      <div class="mobile-box">
        <input type="text" placeholder="手机号/邮箱/用户名"  v-model="phonenumber">
      </div>
      <div class="password">
        <input type="password" placeholder="密码" v-model="password">
        <span class="iconfont icon-yanjing" @click="toggleType" :class="{show:is_show_password}"></span>
      </div>
      <div style="width:100%;padding:10px;box-sizing:border-box;"> 
        <button type="button" class="login-btn" @click="login">登录</button>
      </div>
    </div>
  </div>
</template>
<script>
  import topbar from '../header/header-top-bar'
  import router from '../../router'
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: 'loginphonenumber',
    data() {
      return {
        topbar: {
          title: '密码登录',
          is_arrow_show: true,
        },
        phonenumber:'',
        password:'',
        is_show_password:false,
      };
    },
    components: {
      'v-topbar': topbar
    },
    methods: {
      topBack: function () {
        router.go(-1)
      },
      login:function(){
        let phonenumber = this.phonenumber;
        let password  = this.password;
        let data = qs.stringify({
          phonenumber:phonenumber,
          password:password
        });
        axios.post('/user/signinpassword',data).then(function(response){
          if(response.data.success == 0){
            router.go(-2);
          }
          else if(response.data.success == -2){
            router.replace('/user/loginphonenumber');
          }
          else{
            alert('账号或密码错误');
          }
        });
      },
      toggleType:function(){
        this.is_show_password =!this.is_show_password;
        if(this.is_show_password){
          document.querySelector('.password input').type = 'text';
        }
        else{
          document.querySelector('.password input').type = 'password';
        }
      }
    }
  }

</script>
<style>
  .login-password {
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

  .password{
    position: relative;
  }
  .password span.icon-yanjing{
    display: inline-block;
    font-size: 20px;
    position: absolute;
    right: 20px;
    top: 50%;
    color: #ddd;
    transform: translateY(-50%);  
  }
  .password span.show{
    color: rgb(0, 150, 255);
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
  .user-service{
    color: #4b9dea;
  }
</style>
