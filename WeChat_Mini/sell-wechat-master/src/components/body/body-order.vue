<template>
  <div class="order">
    <v-topbar :title="topbar.title"></v-topbar>
    <div class="order-content" v-if="is_login">
      <div class="no-order" v-if="order_list.length <= 0">
        <div class="text">还没有外卖订单</div>
        <div class="order-now" @click="order">立即订餐</div>
      </div>
      <div v-else>
        <order-list-item v-for="(item,index) in order_list" :order="item" :key="index"></order-list-item>
      </div>
    </div>
    <div class="loginout-content" v-else>
      <div class="text">登录后查看外卖订单</div>
      <div class="login-now" @click="login">立即登录</div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import HeaderTopBar from '../header/header-top-bar';
  import OrderListItem from '../body/order-list-item';
  import Footer from '../footer/index-footer';
  import router from '../../router'
  import axios from 'axios'
  export default {
    name: 'order',
    data() {
      return {
        topbar: {
          title: '订单'
        },
        is_login: false,
        order_list: []
      };
    },
    components: {
      'v-topbar': HeaderTopBar,
      'order-list-item': OrderListItem,
      'v-footer': Footer
    },
    created: function () {
      var self = this;
      axios.get('/orderlist/').then(function (response) {
        if (response.data.success == 0) {
          if (response.data.data.length > 0) {
            self.order_list = response.data.data;
          }
          self.is_login = true;
        } else {
          self.is_login = false;
        }
      })
    },
    methods: {
      login: function () {
        router.push('/user/loginphonenumber');
      },
      order:function(){
        router.push('/index');
      }
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .order {
    width: 100%;
    background-color: #ddd;
  }

  .order-content {
    padding-top: 45px;
    position: relative;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
  .order-content .no-order{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
  }
  .order-content .no-order .text{
    color: #6a6a6a;
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 20px;
  }

  .order-content .no-order .order-now {
    display: inline-block;
    width: 100px;
    background-color: #56d176;
    font-size: 16px;
    padding: 10px 20px;
    color: #fff;
    border-radius: 3px;
  }
  .loginout-content{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    width: 100%;
  }

  .loginout-content .text{
    color: #6a6a6a;
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 20px;
  }

  .loginout-content .login-now {
    display: inline-block;
    width: 100px;
    background-color: #56d176;
    font-size: 16px;
    padding: 10px 20px;
    color: #fff;
    border-radius: 3px;
  }

</style>
