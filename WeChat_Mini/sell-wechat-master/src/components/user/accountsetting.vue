<template>
  <div class="accountsetting">
    <v-topbar :title="topbar.title" :is_arrow_show="topbar.is_arrow_show" @back="topBack"></v-topbar>
    <div class="account-content">
      <div class="person-icon">
        <span class="title">头像</span>
        <img :src="person_icon" alt="头像">
      </div>
      <div class="username">
        <span class="title">用户名</span>
        <span class="text">{{user_info.name}}</span>
      </div>
      <div class="setpassword">
        <h2>设置密码</h2>
        <div class="password">
          <span class="title">登录密码</span>
          <span class="setting" @click="setPassword">未设置</span>
        </div>
      </div>
      <div class="loginout-btn-box">
        <div class="loginout-btn" @click="loginout">退出登录</div>
      </div>
      <v-alertbox :content="alertbox.content" :btn="alertbox.btn" v-if="alertbox.show" @comfirm="comfirmLogout" @cancel="cancelLogout"></v-alertbox>
    </div>
  </div>
</template>
<script>
  import router from '../../router'
  import topbar from '../header/header-top-bar'
  import axios from 'axios';
  import alertbox from '../component/alertbox'
  export default {
    name: 'accountsetting',
    data() {
      return {
        topbar: {
          title: '账户设置',
          is_arrow_show: true,
        },
        has_password: false,
        user_info: {},
        is_login: true,
        alertbox:{
          show:false,
          content:'',
          btn:''
        }
      };
    },
    components: {
      'v-topbar': topbar,
      'v-alertbox':alertbox
    },
    methods: {
      topBack: function () {
        router.go(-1);
      },
      setPassword: function () {
        router.push('/user/setpassword');
      },
      loginout(){
        var self = this;
        self.alertbox.show = true;
        self.alertbox.content = '确定要退出吗？';
        self.alertbox.btn = ['取消','确定'];
      },
      comfirmLogout(){
        let self = this;
        axios.post('/user/logout').then(function(response){
          if(response.data.success == 0){
            router.push('/personcenter');
          }
          else{
            router.push('/personcenter');
          }
        });
      },
      cancelLogout(){
        this.alertbox.show = false;
        this.alertbox.btn = [];
      }
    },
    computed: {
      person_icon() {
        return this.user_info.avatar || "http://xiaodiwaimai.oss-cn-shenzhen.aliyuncs.com/default_person_icon.png"
      },
      phonenumber() {
        if (this.user_info.phonenumber) {
          return this.user_info.phonenumber.substr(0, 3) + '****' + this.user_info.phonenumber.substr(7, 4);
        } else {
          return '';
        }
      }
    },
    created: function () {
      var self = this;
      axios.get('/user/userinfo').then(function (response) {
        if (response.data.success == 0) {
          self.user_info = response.data.data;
        } else if (response.data.success == -1) {
          self.is_login = false;
        }
      });
      axios.get('/user/haspassword').then(function (response) {
        if (response.data.success == 0) {
          self.has_password = true;
        } else if (response.data.success == 1) {
          self.has_password = false;
        } else {
          alert('你还未登录');
        }
      });
    }
  }

</script>

<style scoped>
  .accountsetting {
    background-color: #f5f5f5;
    height: 100%;
  }

  .account-content {
    padding-top: 45px;
  }

  .account-content .person-icon {
    margin-top: 10px;
    background: #fff;
    height: 70px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    line-height: 70px;
    position: relative;
    padding-left: 10px;
  }

  .account-content .person-icon .title {
    display: inline-block;
    vertical-align: top;
  }

  .account-content .person-icon img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    top: 10px;
    right: 20px;
  }

  .account-content .username {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    background: #fff;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .account-content .username .title {
    display: inline-block;
  }

  .account-content .username .text {
    color: #666;
    float: right;
    margin-right: 20px;
  }

  .setpassword {
    margin-top: 10px;
    background: #fff;
  }

  .setpassword h2 {
    height: 40px;
    line-height: 40px;
    color: #ccc;
    font-size: 14px;
    padding-left: 10px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
  }

  .setpassword .password {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .setpassword .password span {
    display: inline-block;
  }

  .setpassword .password .setting {
    float: right;
    color: rgb(0, 150, 255);
  }
  .loginout-btn-box{
    width: 100%;
    padding:0 10px;
    box-sizing: border-box;
    position: fixed;
    bottom:20px;
    left: 50%;
    transform: translateX(-50%);
  }
  .loginout-btn {
    text-align: center;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #ff9900;
    border-radius: 4px;
    color: #fff;
    box-sizing: border-box;
  }

</style>
