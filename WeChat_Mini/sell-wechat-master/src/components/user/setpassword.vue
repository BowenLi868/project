<template>
  <div class="setpassword">
    <v-topbar :title="topbar.title" :is_arrow_show="topbar.is_arrow_show" @back="topBack"></v-topbar>
    <div class="setpassword-content" style="padding-top:45px;">
      <div class="tip">
        设置登密码后，您可以使用手机号+密码登录，请牢记
      </div>
       <div class="password">
        <input type="password" placeholder="密码" v-model="password">
        <span class="iconfont icon-yanjing" @click="toggleType" :class="{show:is_show_password}"></span>
      </div>
       <div class="tip">
        密码长度6-20个字符
      </div>
      <div style="width:100%;padding:10px;box-sizing:border-box;"> 
        <button type="button" class="login-btn" @click="confirm">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
  import router from '../../router'
  import topbar from '../header/header-top-bar'

  export default {
    name: 'setpassword',
    data() {
      return {
        topbar: {
          title: '设置登录密码',
          is_arrow_show: true,
        },
        password:'',
        is_show_password:false
      }
    },
    components: {
      'v-topbar': topbar
    },
    methods: {
      topBack: function () {
        router.go(-1);
      },
      confirm:function(){
        if(this.password.length >= 6 && this.password.length <=20){

        }
        else{
          alert('密码必须在6-20位之间');
        }
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
  .setpassword {
    background-color: #f5f5f5;
    height: 100%;
  }
   .setpassword-content input {
    padding: 0 10px;
    width: 100%;
    height: 40px;
    border: none;
    font-size: 14px;
    outline: none;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
</style>
