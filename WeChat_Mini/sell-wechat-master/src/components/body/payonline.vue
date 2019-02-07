<template>
  <div class="payonline">
    <v-topbar :title="topbar.title" :is_arrow_show="topbar.is_arrow_show" @back="topBack"></v-topbar>
    <div class="payonline-content">
      <div class="pay-time">
        <p>支付剩余时间</p>
        <div class="time">{{time}}</div>
        <div class="pay-detail">
          <div class="shop-name">{{restaurant_info.name}} 外卖订单</div>
          <div class="detail">
            详情
          </div>
          <div class="total-price">
            {{total_price}} 元
          </div>
        </div>
      </div>
      <div class="pay-method">
        <h2>选择支付方式</h2>
        <div>
          <div class="pay-method-item" @click="alipay">
            <div class="icon iconfont icon-z-alipay">
            </div>
            <div class="name">
              支付宝
            </div>
            <div class="radio iconfont icon-radio" :class="{active:method=='zhifubao'}">
            </div>
          </div>
          <div class="flod-box" v-if="show_more_method">
            <div class="pay-method-item" @click="weixin">
              <div class="icon iconfont icon-weixin-pay">
              </div>
              <div class="name">
                微信支付
              </div>
              <div class="radio iconfont icon-radio" :class="{active:method=='weixin'}">
              </div>
            </div>
            <div class="pay-method-item" @click="yinlian">
              <div class="icon iconfont icon-yinlianzhifu">
              </div>
              <div class="name">
                银联支付
              </div>
              <div class="radio iconfont icon-radio" :class="{active:method=='yinlian'}">
              </div>
            </div>
          </div>
        </div>
        <div class="show-more" @click="showMore">
          查看其它支付方式<i class="iconfont icon-xiasanjiao"></i>
        </div>
      </div>
    </div>
    <div class="bottom-content" @click="comfirmPay">
      确认支付
    </div>
  </div>
</template>
<script>
  import router from '../../router'
  import topbar from '../header/header-top-bar'
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: 'payonline',
    data() {
      return {
        topbar: {
          title: '在线支付',
          is_arrow_show: true,
        },
        show_more_method: false,
        method: 'zhifubao',
        order: [],
        time: '15:00'
      }
    },
    methods: {
      topBack() {
        router.go(-1);
      },
      showMore: function () {
        this.show_more_method = !this.show_more_method;
      },
      alipay: function () {
        this.method = 'zhifubao';
      },
      weixin: function () {
        this.method = 'weixin';
      },
      yinlian: function () {
        this.method = "yinlian";
      },
      comfirmPay() {
        switch (this.method) {
          case 'zhifubao':
            alert('使用支付宝支付');
            break;
          case 'weixin':
            alert('使用微信支付');
            break;
          case 'yinlian':
            alert('使用银联支付');
            break;
        }
        let data = qs.stringify({
          restaurant_id:this.$route.params.id,
          restaurant_image_path:this.restaurant_info.image_path,
          shop_name: this.restaurant_info.name,
          status: 1,
          good_list: JSON.stringify(this.order)
        });
        axios.post('/comfirmorder/', data).then(function (response) {
          if (response.data.success == 0) {
            router.push('/order');
          } else if (response.data.success == -1) {
            alert('订单提交失败');
          } else {
            alert('数据库异常');
          }
        });
      }
    },
    computed: {
      restaurant_info() {
        return this.$store.getters.getRestaurantById;
      },
      total_price() {
        var sum = 0;
        this.order.forEach(function (food) {
          if (food.count) {
            sum += food.count * food.price;
          }
        });
        return (sum + this.restaurant_info.delivery_fee + 4).toFixed(2);
      }
    },
    components: {
      'v-topbar': topbar
    },
    created: function () {
      let restaurant_id = this.$route.params.id;
      this.$store.commit('setId', restaurant_id);
      this.order = JSON.parse(localStorage.getItem(restaurant_id));
    }
  }

</script>

<style>
  .payonline {
    height: 100%;
  }

  .payonline .payonline-content {
    padding-top: 45px;
  }

  .payonline .payonline-content .pay-time {
    background: #fff;
    text-align: center;
    padding: 0 10px;
  }

  .payonline .payonline-content .pay-time p {
    font-size: 12px;
    color: #333;
    margin-bottom: 15px;
    padding-top: 15px;
  }

  .payonline-content .pay-time .time {
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .payonline-content .pay-detail {
    height: 40px;
    display: flex;
    line-height: 40px;
  }

  .payonline-content .pay-detail .detail {
    flex: 0 0 30px;
    font-size: 12px;
  }

  .payonline-content .pay-detail .total-price {
    color: #ff6000;
    flex: 0 0 100px;
  }

  .payonline-content .pay-detail .shop-name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 10px;
  }

  .payonline-content .pay-method {
    background: #fff;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .payonline-content .pay-method h2 {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
  }

  .payonline-content .pay-method .pay-method-item {
    display: flex;
    height: 60px;
    line-height: 60px;
    margin-left: 10px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .payonline-content .pay-method .pay-method-item .iconfont {
    font-size: 24px;
    flex: 0 0 40px;
  }

  .payonline-content .pay-method .pay-method-item .icon-z-alipay {
    color: #00a1e9;
  }

  .payonline-content .pay-method .pay-method-item .icon-radio {
    color: #ccc;
  }

  .payonline-content .pay-method .pay-method-item .icon-radio.active,
  .payonline-content .pay-method .pay-method-item .icon-weixin-pay {
    color: #00ba61;
  }

  .payonline-content .pay-method .pay-method-item .icon-yinlianzhifu {
    color: rgb(0, 150, 255);
  }

  .payonline-content .pay-method .pay-method-item .name {
    flex: 1;
  }

  .payonline-content .pay-method .show-more {
    height: 40px;
    line-height: 40px;
    color: #ccc;
    text-align: center;
    font-size: 14px;
  }

  .payonline-content .pay-method .show-more .iconfont {
    font-size: 12px;
    display: inline-block;
    margin-left: 10px;
  }

  .payonline .bottom-content {
    position: fixed;
    background: #4cd964;
    bottom: 0;
    left: 0;
    right: 0;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #fff;
  }

</style>
