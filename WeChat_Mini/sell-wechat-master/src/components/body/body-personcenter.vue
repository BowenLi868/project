<template>
  <div class="personcenter">
    <v-topbar :title = "topbar.title"></v-topbar>
    <div class="account">
      <div class="person-icon">
        <img :src="person_icon" alt="">
      </div>
      <div class="login-box" @click="login">
          <div class="login-signin">{{user_info.name || '登录/注册'}}</div>
          <div class="login-description">{{phonenumber || '登录后享受更多特权'}}</div>
      </div>
    </div>
    <div class="person-info">
      <div class="balance"><span class="iconfont  icon-balance"></span>余额</div>
      <div class="discount"><span class="iconfont  icon-youhui"></span>优惠</div>
      <div class="integral"><span class="iconfont  icon-jifen"></span>积分</div>
    </div>
    <div class="container">
      <ul class="details">
        <li class="details-item" @click="manageAddress" v-if="is_login"><i class="iconfont icon-dizhi" style="color:rgb(0,150,255);" ></i>收货地址管理<i class="iconfont icon-arrow"></i></li>
         <li class="details-item"v-if="is_login"><i class="iconfont icon-daijinquan" style="color: rgb(255, 153, 0);" ></i>商家代金券<i class="iconfont icon-arrow"></i></li>
          <li class="details-item"><i class="iconfont icon-yijianfankui" style="color: rgb(0, 255, 222);" ></i>意见反馈<i class="iconfont icon-arrow"></i></li>
           <li class="details-item"><i class="iconfont icon-changjianwenti" style="color:rgb(255, 0, 0);"></i>常见问题<i class="iconfont icon-arrow"></i></li>
            <li class="details-item"  v-if="is_login"><i class="iconfont icon-kefudianhua" style="color: rgb(0, 150, 255);"></i>客服电话<i class="iconfont icon-arrow"></i></li>   
      </ul>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import HeaderTopBar from '../header/header-top-bar';
import Footer from '../footer/index-footer';
import router from '../../router'
import axios from 'axios'
export default {
  name: 'personcenter',
  data () {
    return {
      topbar:{
        title:'个人中心',
      },
      user_info:{},
      is_login:false
    };
  },
  methods:{
    login:function(){
      if(this.is_login){
        router.push('/user/accountsetting');
      }
      else{
        router.push('/user/loginphonenumber');
      }
    },
    manageAddress:function(){
      router.push('/sendaddress');
    }
  },
  components: {
    'v-topbar': HeaderTopBar,
    'v-footer':Footer
  },
  created:function(){
    var self= this;
    axios.get('/user/userinfo').then(function(response){
      if(response.data.success == 0){
        self.user_info = response.data.data;
        self.is_login = true;
      }
      else if(response.data.success == -1){
        self.is_login =  false;
      }
    })
  },
  computed:{
    person_icon(){
      return this.user_info.avatar || "http://xiaodiwaimai.oss-cn-shenzhen.aliyuncs.com/default_person_icon.png"
    },
    phonenumber(){
      if(this.user_info.phonenumber){
        return this.user_info.phonenumber.substr(0,3) + '****' + this.user_info.phonenumber.substr(7,4);
      }
      else{
        return '';
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .personcenter {
    width: 100%;
    background: #f4f4f4;
  }
  .container{
     background-color:#fff;
     margin-top: 20px;
  }
  .account{
   display: flex;
   height: 110px;
   background-color: rgb(0,150,255);
   padding-top: 45px;
  }
  .account .person-icon{
    flex: 0 0 100px;
    height: 110px;
  }
  .account .person-icon img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin: 20px 10px 0;
  }
  .account .login-box{
    flex: 1;
    color: #fff;
    padding-top: 30px;
  }
  .account .login-box .login-signin{
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 10px;
  }
  .personcenter .person-info{
    display: flex;
    background: #fff;
    text-align: center;
    border-bottom: 1px solid #d7d7d7;
    font-size: 12px;
  }
  .personcenter .person-info div{
    padding: 20px;
    box-sizing: border-box;
    border-right: 1px solid #d7d7d7;
    flex: 1;
  }
  .personcenter .person-info div:last-child{
    border-right: none;
  }
  .personcenter .person-info .iconfont{
    font-size: 24px;
    margin-bottom: 10px;
    display: block;
  }
  .personcenter .person-info .balance .iconfont{
    color: #ff9900;
  }
  .personcenter .person-info .discount .iconfont{
    color: #ff5f3e;
  }
  .personcenter .person-info .integral .iconfont{
    color: #6ac20b;
  }
  .personcenter .details{
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 0 15px;
  }
  .personcenter .details .details-item{
    position: relative;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
  }
  .personcenter .details .details-item:last-child{
    border: none;
  }

  .personcenter .details .details-item .iconfont{
    font-size: 16px;
    padding:0 5px;
  }
  .personcenter .details .details-item .icon-arrow{
    padding: 0;
    font-size: 20px;
    display: inline-block;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -20px;
  }
  .login-description{
    font-size: 14px;
  }
</style>
