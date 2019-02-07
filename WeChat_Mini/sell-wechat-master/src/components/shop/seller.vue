<template>
  <div class="seller">
    <div class="seller-box">
      <div class="seller-top">
        <div class="seller-name">
          {{restaurant_info.name}}
        </div>
        <div class="star-sell-num">
          <v-star :score="restaurant_info.rating" :size="star.size"></v-star><span class="sell-count">月售{{restaurant_info.recent_order_num}}单</span>
        </div>
        <div class="sell-detail">
          <div class="can-send">
            <span>起送价</span>
            <p>{{restaurant_info.minimum_order_amount}}<span class="small-font">元</span></p>
          </div>
          <div class="sell-send">
            <span>商家配送</span>
            <p>{{restaurant_info.delivery_fee}}<span class="small-font">元</span></p>
          </div>
          <div class="send-time">
            <span>平均配送时间</span>
            <p>{{restaurant_info.order_lead_time}}<span class="small-font">分钟</span></p>
          </div>
        </div>
      </div>
      <div class="notice-activity">
        <h2 class="title">公告与活动</h2>
        <p>{{restaurant_info.promotion_info?restaurant_info.promotion_info:'欢迎光临'+ restaurant_info.name}}</p>
        <ul>
          <li v-for="item in restaurant_info.activities"><span class="activity-item"><span class="icon" style="color:#fff;margin-right:5px;font-size:10px;padding:2px;border-radius:2px;text-align:center;" :style="{backgroundColor:'#'+item.icon_color}">{{item.icon_name}}</span>{{item.description}}</span>
          </li>
        </ul>
      </div>
      <div class="seller-infomation">
        <h2 class="title">商家信息</h2>
        <ul>
          <li v-for="item in restaurant_info.supports"><span class="activity-item"><span class="icon" style="color:#fff;margin-right:5px;font-size:10px;padding:2px;border-radius:2px;text-align:center;" :style="{backgroundColor:'#'+item.icon_color}">{{item.icon_name}}</span>{{item.description}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import Star from '../component/star'
  import BScroll from 'better-scroll'
  import axios from 'axios'
  export default {
    name: 'seller',
    data() {
      return {
        star: {
          size: '36'
        },

      }
    },
    components: {
      'v-star': Star
    },
    computed: {
      restaurant_info() {
        return this.$store.getters.getRestaurantById;
      }
    },
    created: function () {
      this.$store.commit('setId', this.$route.params.id);
      this.$nextTick(function(){
        new BScroll(document.querySelector('.seller'), {
          click: true,
        });
      });
    }
  }

</script>

<style>
  .seller {
    position: absolute;
    top: 0;
    bottom: 0;
    background: #f3f5f7;
    overflow: hidden;
    width: 100%;
  }

  .seller .seller-top {
    background-color: #fff;
    padding: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .seller .seller-name {
    font-size: 14px;
    color: rgb(7, 17, 27);
    line-height: 14px;
    margin-bottom: 8px;
  }

  .seller .star-sell-num {
    font-size: 0;
    color: rgb(77, 85, 93);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    padding-bottom: 18px;
  }

  .star-sell-num .star {
    display: inline-block;
    vertical-align: top;
  }

  .seller .star-sell-num .sell-count {
    vertical-align: top;
    display: inline-block;
    line-height: 18px;
    font-size: 10px;
    margin-left: 20px;
  }

  .sell-detail {
    display: flex;
    padding-top: 18px;
    width: 100%;
    text-align: center;
  }

  .sell-detail span {
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .sell-detail p {
    margin-top: 4px;
    font-size: 20px;
    color: rgb(7, 17, 27);
    line-height: 24px;
    font-weight: 200;
  }

  .sell-detail p span.small-font {
    color: rgb(7, 17, 27);
  }

  .sell-detail .can-send {
    flex: 1;
  }

  .sell-detail .sell-send {
    flex: 1;
    border-left: 1px solid rgba(7, 17, 27, 0.1);
  }

  .sell-detail .send-time {
    flex: 1;
    border-left: 1px solid rgba(7, 17, 27, 0.1);
  }

  .seller .notice-activity,
  .seller .seller-infomation {
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    margin: 18px 0;
    padding: 18px;
    background-color: #fff;
  }

  .seller .notice-activity .title,
  .seller .seller-infomation .title {
    font-size: 14px;
    color: rgb(7, 17, 27);
    margin-bottom: 8px;
  }

  .seller .notice-activity p {
    font-size: 10px;
    font-weight: 200;
    color: rgb(240, 20, 220);
    line-height: 24px;
    padding-left: 12px;
  }

  .seller .notice-activity ul li,
  .seller .seller-infomation ul li {
    padding: 12px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
  }

  .seller .notice-activity .activity-item,
  .seller .seller-infomation .activity-item {
    display: inline-block;
    height: 16px;
    width: 100%;
    line-height: 20px;
    font-size: 12px;
    font-weight: 200;
    color: rgb(7, 17, 27);
    margin: 0;
  }

  .seller .notice-activity .activity-item .icon .seller .seller-infomation .activity-item .icon {
    display: inline-block;
    height: 16px;
    width: 16px;
  }

</style>
