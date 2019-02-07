/* * @Author: wangdi * @Date: 2017-04-09 21:22:41 * @Last Modified by: wangdi * @Last Modified time: 2017-04-09 22:37:10
*/

<template>
  <div class="comfirmorder">
    <v-topbar :title="topbar.title" :is_arrow_show="topbar.is_arrow_show" @back="topBack"></v-topbar>
    <div class="comfirmorder-content">
      <div class="select-address" @click="selectAddress">
        <span class="iconfont icon-dizhi"></span>
        <div class="content" v-if="!send_address.name">请选择一个收货地址</div>
        <div class="address-content" v-else>
          <div class="top">
            <span class="name">{{send_address.name}}</span>
            <span class="sex">{{send_address.sex}}</span>
            <span class="phonenumber">{{send_address.phonenumber}}</span>
          </div>
          <div class="bottom">
            <span class="label">{{send_address.label}}</span>{{send_address.address}}-{{send_address.detail_address}}
          </div>
        </div>
        <span class="iconfont icon-arrow"></span>
      </div>
      <div class="send-time">
        <div class="time">
          送达时间
        </div>
        <div class="desciprtion">
          <div class="top">
            尽快送达 | 预计 {{time}}
          </div>
          <div class="bottom">
            小迪专送
          </div>
        </div>
      </div>
      <div class="pay-method">
        支付方式
        <span class="method">在线支付</span>
        <span class="iconfont icon-arrow"></span>
      </div>
      <div class="order-detail">
        <h2 class="shop-name"><img :src="restaurant_info.image_path" alt="">{{restaurant_info.name}}</h2>
        <ul class="order-food-list">
          <li class="order-food-list-item" v-for="food in order">
            <div class="food-name">{{food.name}}</div>
            <div class="food-number">x{{food.count}}</div>
            <div class="food-total-price">￥{{food.price*food.count}}</div>
          </li>
        </ul>
        <div class="box-fee">
          <div class="text">餐盒</div>
          <div class="box-price">
            ￥4
          </div>
        </div>
        <div class="send-fee">
          <div class="text">配送费</div>
          <div class="send-money">
            ￥{{restaurant_info.delivery_fee}}
          </div>
        </div>
      </div>
      <div class="remark">
        <div class="item">
          用餐人数
          <span>便于商家带够餐具<i class="iconfont icon-arrow"></i></span>
        </div>
        <div class="item">
          订单备注
          <span>口味、偏好等<i class="iconfont icon-arrow"></i></span>
        </div>
        <div class="item">
          发票抬头
          <span style="color:#ccc;">不支持开发票</span>
        </div>
      </div>
    </div>
    <div class="bottom-content">
      <div class="wait-pay-money">
        待支付￥{{total_price}}
      </div>
      <div class="submit-order" @click="submitOrder">
        提交订单
      </div>
    </div>
  </div>
</template>
<script>
  import router from '../../router'
  import topbar from '../header/header-top-bar'

  export default {
    name: 'comfirmorder',
    data() {
      return {
        topbar: {
          title: '确认订单',
          is_arrow_show: true,
          time:'',
          total_price:'',
          order:[],
          send_address:{}
        }
      }
    },
    components: {
      'v-topbar': topbar
    },
    methods: {
      topBack: function () {
        router.go(-1);
      },
      selectAddress: function () {
        router.push('/sendaddress');
      },
      submitOrder:function(){
        router.push('/payonline/'+this.$route.params.id);
      },
      caculateTime(){
        if((Number.parseInt(new Date().getMinutes())) < 30){
          return (new Date().getHours() < 10 ? ('0'+new Date().getHours()):new Date().getHours()) + ':'+ (Number.parseInt(new Date().getMinutes()) + 30);
        }
        else{
          return (new Date().getHours()+1 < 10 ? ('0'+new Date().getHours()+1):(new Date().getHours()+1)) + ':'+ ((Number.parseInt(new Date().getMinutes()) -30) %60);
        }
      }
    },
    computed:{
      restaurant_info(){
        return this.$store.getters.getRestaurantById;
      },
      total_price(){
         var sum = 0;
         this.order.forEach(function(food){
          if(food.count){
            sum+=food.count*food.price;
          }
         });
         return (sum+this.restaurant_info.delivery_fee + 4).toFixed(2);
      }
    },
    created:function(){
      let restaurant_id = this.$route.params.id;
      this.$store.commit('setId',restaurant_id);
      this.time = this.caculateTime();
      this.order = JSON.parse(localStorage.getItem(restaurant_id));
      this.send_address = JSON.parse(sessionStorage.getItem('selectAddress')) || {};
    }
  }

</script>

<style>
  .comfirmorder {
    height: 100%;
  }

  .comfirmorder .comfirmorder-content {
    padding-top: 45px;
  }

  .select-address {
    background: #fff;
    padding: 10px 30px;
    position: relative;
  }
 .select-address .address-content .top{
    padding-bottom: 5px;
  }
  .select-address .address-content .name{
    font-size: 16px;
  }
  .select-address .address-content .sex,.select-address .address-content .phonenumber{
    font-size: 14px;
  }
  .select-address .address-content .bottom{
    font-size: 12px;
    line-height: 18px;
  }
  .select-address .address-content .bottom .label{
    color: #fff;
    background: rgb(0, 150, 255);
    font-size: 10px;
    padding: 0 5px;
    margin-right: 10px;
    border-radius: 2px;
  }
  .select-address .iconfont {
    position: absolute;
  }

  .select-address .icon-dizhi {
    color: rgb(0, 150, 255);
    left: 10px;
    transform: translateY(-50%);
    top: 50%;
  }

  .select-address .icon-arrow {
    right: 10px;
    transform: translateY(-50%);
    top: 50%;
  }

  .comfirmorder .send-time {
    display: flex;
    border-left: 3px solid rgb(0, 150, 255);
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    margin-top: 10px;
    padding: 8px 0;
    background: #fff;
  }

  .comfirmorder .send-time .time {
    flex: 0 0 100px;
    line-height: 60px;
    padding-left: 10px;
  }

  .comfirmorder .send-time .desciprtion {
    flex: 1;
    text-align: right;
    padding-right: 10px;
  }

  .comfirmorder .send-time .desciprtion div {
    line-height: 30px;
    color: #ccc;
    font-size: 14px;
  }

  .comfirmorder .send-time .desciprtion .top {
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .comfirmorder .pay-method {
    background: #fff;
    margin-top: 10px;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    position: relative;
  }

  .comfirmorder .pay-method .method {
    font-size: 12px;
    color: #666;
    float: right;
    padding-right: 16px;
  }

  .comfirmorder .pay-method .iconfont {
    position: absolute;
    right: 10px;
    font-size: 12px;
  }

  .order-detail {
    background: #fff;
    margin-top: 10px;
  }

  .order-detail .shop-name {
    height: 40px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    line-height: 40px;
    box-sizing: border-box;
    color: #666;
    padding-left: 10px;
  }

  .order-detail .shop-name img {
    display: inline-block;
    height: 18px;
    width: 18px;
    vertical-align: middle;
    margin-right: 10px;
  }

  .order-detail .order-food-list {
    padding: 0 10px;
  }

  .order-detail .order-food-list .order-food-list-item {
    height: 40px;
    line-height: 40px;
    display: flex;
  }

  .order-detail .order-food-list .order-food-list-item .food-number {
    flex: 0 0 30px;
    text-align: right;
    font-size: 14px;
    color: #666;
  }

  .order-detail .order-food-list .order-food-list-item .food-total-price {
    flex: 0 0 70px;
    text-align: right;
  }

  .order-detail .order-food-list .order-food-list-item .food-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }

  .box-fee,
  .send-fee {
    display: flex;
    background: #fff;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    box-sizing: border-box;
  }

  .box-fee .text {
    color: #666;
  }

  .box-fee .box-price,
  .send-fee .send-money {
    flex: 0 0 50px;
    text-align: right;
  }

  .box-fee .text,
  .send-fee .text {
    flex: 1;
  }

  .remark {
    margin-top: 10px;
    background: #fff;
  }

  .remark .item {
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    padding: 0 10px;
    position: relative;
  }

  .remark .item span {
    display: inline-block;
    position: absolute;
    right: 10px;
    color: #666;
    font-size: 12px;
  }

  .remark .item span .iconfont {
    font-size: 12px;
  }

  .comfirmorder .bottom-content {
    height: 45px;
    line-height: 45px;
    background: #222;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    color: #fff;
    display: flex;
  }

  .comfirmorder .bottom-content .wait-pay-money {
    flex: 1;
    padding-left: 10px;
  }

  .comfirmorder .bottom-content .submit-order {
    flex: 0 0 120px;
    background: #00b43c;
    text-align: center;
  }

</style>
